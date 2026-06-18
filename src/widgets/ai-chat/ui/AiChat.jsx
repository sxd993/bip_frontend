import { useAiChat, ChatMessage } from "@/features/ai-chat";

export const AiChat = () => {
  const {
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
  } = useAiChat();

  const startNewConsultation = () => {
    window.location.reload();
  };

  return (
    <div
      id="chat"
      className="flex h-[min(440px,70vh)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <div className="flex shrink-0 items-center gap-3 bg-primary px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xs font-bold text-on-primary">
          БП
        </div>
        <div>
          <p className="font-semibold text-on-primary">
            Интеллектуальный помощник
          </p>
          <p className="text-xs text-on-primary/70">Онлайн · отвечает сразу</p>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-background px-4 py-4"
      >
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <ChatMessage isTyping />}
        <div ref={messagesEndRef} />
      </div>

      {isLocked && (
        <div className="shrink-0 border-t border-border bg-surface px-4 py-3 text-sm text-text">
          <span className="font-semibold text-success">
            Заявка принята{dealId ? ` № ${dealId}` : ""}.
          </span>{" "}
          <button
            type="button"
            onClick={startNewConsultation}
            className="text-primary hover:underline"
          >
            Начать новую консультацию
          </button>
        </div>
      )}

      <div className="shrink-0 border-t border-border bg-surface px-4 py-3">
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-colors ${
            isLocked
              ? "border-border bg-background"
              : "border-border focus-within:border-primary"
          }`}
        >
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isStreaming || isLocked}
            placeholder={isLocked ? "Заявка создана" : "Опишите ситуацию..."}
            rows={1}
            className="max-h-24 min-h-6 flex-1 resize-none bg-transparent py-1 text-sm leading-6 text-text outline-none placeholder:text-text-muted disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming || isLocked}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-on-primary transition-all hover:bg-primary-hover disabled:opacity-30 active:scale-95"
            aria-label="Отправить"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
