import { useState, useRef } from "react";
import { streamAiMessage } from "../api/aiChatApi";

const DEAL_JSON_REGEX = /\{"action":"create_deal"[\s\S]*?\}/;

export const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Здравствуйте! Я ассистент юридической компании «Баукен и Партнеры». Расскажите, пожалуйста, с какой проблемой вы обратились?",
};

export const useAiChat = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [dealId, setDealId] = useState(null);
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

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);
    setIsTyping(true);
    scrollToBottom();

    try {
      const reader = await streamAiMessage(nextMessages);
      const decoder = new TextDecoder();
      let buffer = "";
      let botText = "";
      let firstToken = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();

          try {
            const event = JSON.parse(raw);

            if (event.token !== undefined) {
              if (!firstToken) {
                firstToken = true;
                setIsTyping(false);
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: "" },
                ]);
              }
              botText += event.token;
              const display = botText.replace(DEAL_JSON_REGEX, "").trim();
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: display,
                };
                return updated;
              });
              scrollToBottom();
            } else if (event.done === true) {
              setIsLocked(true);
              if (event.dealId) setDealId(event.dealId);
            } else if (event.error) {
              setIsTyping(false);
              if (!firstToken) {
                setMessages((prev) => [
                  ...prev,
                  {
                    role: "assistant",
                    content:
                      "Произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую.",
                  },
                ]);
              }
            }
          } catch {
            // пропускаем битые SSE-чанки
          }
        }
      }

      if (!firstToken) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Не удалось получить ответ. Пожалуйста, повторите вопрос.",
          },
        ]);
      }
    } catch (err) {
      console.error("[AI Chat] ошибка:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ошибка соединения. Пожалуйста, попробуйте позже.",
        },
      ]);
    } finally {
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
  };

  return {
    messages,
    input,
    isStreaming,
    isTyping,
    isLocked,
    dealId,
    messagesEndRef,
    scrollContainerRef,
    sendMessage,
    handleKeyDown,
    handleInputChange,
  };
};
