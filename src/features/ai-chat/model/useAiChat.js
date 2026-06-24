import { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { streamAiMessage } from '@/entities/ai-chat/api/aiChatApi';

const ORDER_JSON_REGEX = /\{"action":"create_(?:order|deal)"[\s\S]*?\}/;

export const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Здравствуйте! Я ассистент юридической компании «Баукен и Партнеры». Расскажите, пожалуйста, с какой проблемой вы обратились?'
};

export const useAiChat = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      const el = scrollContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming || isLocked) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsStreaming(true);
    setIsTyping(true);
    scrollToBottom();

    let errorShown = false;
    // Показать сообщение об ошибке ровно один раз и снять индикатор печати.
    const showError = (text) => {
      if (errorShown) return;
      errorShown = true;
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    };

    try {
      const reader = await streamAiMessage(nextMessages);
      const decoder = new TextDecoder();
      let buffer = '';
      let botText = '';
      let firstToken = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();

          try {
            const event = JSON.parse(raw);

            if (event.token !== undefined) {
              if (!firstToken) {
                firstToken = true;
                setIsTyping(false);
                setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
              }
              botText += event.token;
              const jsonIdx = botText.indexOf('{"action":"create_');
              const display = (jsonIdx >= 0 ? botText.slice(0, jsonIdx) : botText.replace(ORDER_JSON_REGEX, '')).trim();
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: display };
                return updated;
              });
              scrollToBottom();
            } else if (event.done === true) {
              setIsLocked(true);
              const createdOrderId = event.orderId ?? event.dealId ?? null;
              if (createdOrderId) setOrderId(createdOrderId);
              queryClient.invalidateQueries({ queryKey: ['pendingOrder'] });
            } else if (event.error) {
              showError('Произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую.');
            }
          } catch {
            // пропускаем битые SSE-чанки
          }
        }
      }
    } catch (err) {
      console.error('[AI Chat] ошибка:', err);
      if (err.message === 'UNAUTHORIZED') {
        showError('Для использования помощника необходимо войти в аккаунт.');
      } else {
        showError('Ошибка соединения. Пожалуйста, попробуйте позже.');
      }
    } finally {
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  const selectSuggestion = (text) => {
    setInput(text);
  };

  return {
    messages,
    input,
    isStreaming,
    isTyping,
    isLocked,
    orderId,
    messagesEndRef,
    scrollContainerRef,
    sendMessage,
    handleKeyDown,
    handleInputChange,
    selectSuggestion,
  };
};
