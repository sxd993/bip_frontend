import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { streamAiMessage } from '@/entities/ai-chat/api/aiChatApi';
import { createOrderApi, getCurrentOrderApi } from '@/entities/orders';
import {
  ORDER_SITUATION,
  normalizeSituationType,
  resolveSituationType,
} from './orderSituation';

const ORDER_JSON_REGEX =
  /\{"action"\s*:\s*"(?:propose|create)_(?:order|deal)"[\s\S]*\}/;
const ORDER_MARKER_REGEX = /\{\s*"action"\s*:/;
const SUGGESTIONS_REGEX =
  /\{\s*"suggestions"\s*:\s*\[[\s\S]*?\]\s*\}/i;

export const INITIAL_SUGGESTIONS = [
  'Затопление',
  'Другая ситуация',
];

export const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    'Здравствуйте! Я ассистент юридической компании «КР17». Расскажите, пожалуйста, с какой проблемой вы обратились?',
  suggestions: INITIAL_SUGGESTIONS,
};

const normalizeConfirmations = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === 'string' && item.trim())
    .map((item) => item.trim())
    .slice(0, 6);
};

const stripCodeFences = (text) =>
  text.replace(/```(?:json)?\s*([\s\S]*?)```/gi, '$1');

const extractBalancedJsonObject = (text, startIndex) => {
  if (startIndex < 0 || text[startIndex] !== '{') return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = startIndex; i < text.length; i += 1) {
    const char = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return text.slice(startIndex, i + 1);
      }
    }
  }

  return null;
};

const parseOrderProposal = (rawText) => {
  const text = stripCodeFences(rawText);
  const marker = text.match(ORDER_MARKER_REGEX);
  if (!marker) return null;

  const jsonText = extractBalancedJsonObject(text, marker.index);
  if (!jsonText) return null;

  try {
    const data = JSON.parse(jsonText);
    if (
      data.action !== 'propose_order' &&
      data.action !== 'create_order' &&
      data.action !== 'create_deal'
    ) {
      return null;
    }

    const amount = Number(data.amount);
    if (
      !data.title ||
      !data.summary ||
      !data.timeline ||
      !Number.isFinite(amount)
    ) {
      return null;
    }

    return {
      title: data.title,
      summary: data.summary,
      legal_area: data.legal_area || 'другое',
      timeline: data.timeline,
      amount,
      situation_type: normalizeSituationType(
        data.situation_type || data.status,
      ),
      confirmations: normalizeConfirmations(data.confirmations),
    };
  } catch {
    return null;
  }
};

const parseSuggestions = (text) => {
  const match = text.match(SUGGESTIONS_REGEX);
  if (!match) {
    const markerIdx = text.search(/\{\s*"suggestions"\s*:/i);
    if (markerIdx >= 0) {
      return {
        display: text.slice(0, markerIdx).trim(),
        suggestions: [],
        incomplete: true,
      };
    }
    return { display: text.trim(), suggestions: [], incomplete: false };
  }

  try {
    const parsed = JSON.parse(match[0]);
    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions
          .filter((item) => typeof item === 'string' && item.trim())
          .map((item) => item.trim())
          .slice(0, 4)
      : [];
    return {
      display: text.replace(match[0], '').trim(),
      suggestions,
      incomplete: false,
    };
  } catch {
    const markerIdx = text.search(/\{\s*"suggestions"\s*:/i);
    return {
      display: markerIdx >= 0 ? text.slice(0, markerIdx).trim() : text.trim(),
      suggestions: [],
      incomplete: true,
    };
  }
};

const parseAssistantPayload = (rawText) => {
  let text = stripCodeFences(rawText);
  const proposal = parseOrderProposal(text);

  const orderMarker = text.match(ORDER_MARKER_REGEX);
  if (orderMarker) {
    const jsonText = extractBalancedJsonObject(text, orderMarker.index);
    text = jsonText
      ? `${text.slice(0, orderMarker.index)}${text.slice(orderMarker.index + jsonText.length)}`
      : text.slice(0, orderMarker.index);
  } else {
    text = text.replace(ORDER_JSON_REGEX, '');
  }

  const { display, suggestions } = parseSuggestions(text.trim());

  return {
    display,
    suggestions,
    proposal,
  };
};

const toApiMessages = (messages) =>
  messages.map((message) => {
    if (
      message.role !== 'assistant' ||
      !Array.isArray(message.suggestions) ||
      message.suggestions.length === 0
    ) {
      return { role: message.role, content: message.content };
    }

    return {
      role: message.role,
      content: `${message.content}\n{"suggestions":${JSON.stringify(message.suggestions)}}`,
    };
  });

export const useAiChat = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [pendingProposal, setPendingProposal] = useState(null);
  const situationTypeRef = useRef(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const wasStreamingRef = useRef(false);
  useEffect(() => {
    if (wasStreamingRef.current && !isStreaming && !isLocked && !isConfirmOpen) {
      inputRef.current?.focus();
    }
    wasStreamingRef.current = isStreaming;
  }, [isStreaming, isLocked, isConfirmOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      const el = scrollContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  };

  const openProposalModal = (proposal) => {
    if (!proposal) return;
    const resolvedType = normalizeSituationType(
      situationTypeRef.current || proposal.situation_type,
    );
    setPendingProposal({
      ...proposal,
      situation_type: resolvedType,
      status: resolvedType,
    });
    setConfirmError(null);
    setIsConfirmOpen(true);
    setSuggestions([]);
  };

  const sendMessage = async (overrideText) => {
    const trimmed = (
      typeof overrideText === 'string' ? overrideText : input
    ).trim();
    if (!trimmed || isStreaming || isLocked || isConfirmOpen) return;

    if (!situationTypeRef.current) {
      const resolved = resolveSituationType(trimmed, ORDER_SITUATION.OTHER);
      situationTypeRef.current = resolved;
    }

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setSuggestions([]);
    setIsStreaming(true);
    setIsTyping(true);
    scrollToBottom();

    let errorShown = false;
    const showError = (text) => {
      if (errorShown) return;
      errorShown = true;
      setIsTyping(false);
      setSuggestions([]);
      setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
    };

    try {
      const reader = await streamAiMessage(
        toApiMessages(nextMessages),
        situationTypeRef.current,
      );
      const decoder = new TextDecoder();
      let buffer = '';
      let botText = '';
      let firstToken = false;
      let streamedProposal = null;
      let latestSuggestions = [];

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
                setMessages((prev) => [
                  ...prev,
                  { role: 'assistant', content: '', suggestions: [] },
                ]);
              }
              botText += event.token;
              const {
                display,
                suggestions: nextSuggestions,
                proposal,
              } = parseAssistantPayload(botText);
              if (proposal) streamedProposal = proposal;
              if (nextSuggestions.length) {
                latestSuggestions = nextSuggestions;
                setSuggestions(nextSuggestions);
              }
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: display,
                  suggestions: latestSuggestions,
                };
                return updated;
              });
              scrollToBottom();
            } else if (event.proposeOrder) {
              streamedProposal = {
                title: event.proposeOrder.title,
                summary: event.proposeOrder.summary,
                legal_area: event.proposeOrder.legal_area || 'другое',
                timeline: event.proposeOrder.timeline,
                amount: Number(event.proposeOrder.amount),
                situation_type: normalizeSituationType(
                  event.proposeOrder.situation_type ||
                    event.proposeOrder.status,
                ),
                confirmations: normalizeConfirmations(
                  event.proposeOrder.confirmations,
                ),
              };
            } else if (event.done === true) {
              setIsLocked(true);
              setSuggestions([]);
              queryClient.invalidateQueries({ queryKey: ['pendingOrder'] });
              try {
                const order = await getCurrentOrderApi();
                if (order?.order_number) setOrderId(order.order_number);
              } catch {
                const fallback = event.orderId ?? event.dealId ?? null;
                if (fallback) setOrderId(fallback);
              }
            } else if (event.error) {
              showError(
                typeof event.error === 'string'
                  ? event.error
                  : 'Произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую.',
              );
            }
          } catch {
            // пропускаем битые SSE-чанки
          }
        }
      }

      if (botText) {
        const {
          display,
          suggestions: nextSuggestions,
          proposal,
        } = parseAssistantPayload(botText);
        if (proposal) streamedProposal = proposal;
        if (nextSuggestions.length) {
          latestSuggestions = nextSuggestions;
        }

        setMessages((prev) => {
          const updated = [...prev];
          if (updated.length && updated[updated.length - 1].role === 'assistant') {
            updated[updated.length - 1] = {
              role: 'assistant',
              content: display,
              suggestions: latestSuggestions,
            };
          }
          return updated;
        });

        if (!streamedProposal) {
          setSuggestions(latestSuggestions);
        }
      }

      if (streamedProposal) {
        openProposalModal(streamedProposal);
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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
  };

  const selectSuggestion = (text) => {
    sendMessage(text);
  };

  const closeConfirmModal = () => {
    if (isConfirming) return;
    setIsConfirmOpen(false);
    setConfirmError(null);
    setPendingProposal(null);
    situationTypeRef.current = null;
    setMessages([INITIAL_MESSAGE]);
    setSuggestions(INITIAL_SUGGESTIONS);
    setInput('');
    setIsLocked(false);
    setOrderId(null);
    setIsStreaming(false);
    setIsTyping(false);
  };

  const confirmOrder = async (formPayload = {}) => {
    if (!pendingProposal || isConfirming) return;

    const {
      files = [],
      fullName = '',
      additionalDescription = '',
      confirmations,
    } = formPayload;

    setIsConfirming(true);
    setConfirmError(null);

    try {
      const resolvedType = normalizeSituationType(
        situationTypeRef.current ||
          pendingProposal.situation_type ||
          pendingProposal.status,
      );

      const result = await createOrderApi({
        ...pendingProposal,
        situation_type: resolvedType,
        status: resolvedType,
        client_name: fullName,
        additional_description: additionalDescription,
        files: Array.isArray(files) ? files : [],
        ...(Array.isArray(confirmations) ? { confirmations } : {}),
      });

      setIsConfirmOpen(false);
      setPendingProposal(null);
      setIsLocked(true);
      setSuggestions([]);
      setOrderId(result.order?.order_number ?? result.orderId ?? null);
      queryClient.invalidateQueries({ queryKey: ['pendingOrder'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        'Не удалось создать заявку. Попробуйте ещё раз.';
      setConfirmError(message);
    } finally {
      setIsConfirming(false);
    }
  };

  return {
    messages,
    input,
    suggestions,
    isStreaming,
    isTyping,
    isLocked,
    orderId,
    pendingProposal,
    isConfirmOpen,
    isConfirming,
    confirmError,
    messagesEndRef,
    scrollContainerRef,
    inputRef,
    sendMessage,
    handleKeyDown,
    handleInputChange,
    selectSuggestion,
    closeConfirmModal,
    confirmOrder,
  };
};
