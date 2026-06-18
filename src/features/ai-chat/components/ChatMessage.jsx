const BotAvatar = () => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold tracking-tight text-on-primary shadow-sm">
    БП
  </div>
);

export const ChatMessage = ({ role, content, isTyping }) => {
  const isUser = role === 'user';

  if (isTyping) {
    return (
      <div className="flex items-end gap-2.5">
        <BotAvatar />
        <div className="rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3.5 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '0ms' }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '160ms' }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '320ms' }} />
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2.5">
        <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-on-primary shadow-sm">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2.5">
      <BotAvatar />
      <div className="max-w-[78%] rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-text shadow-sm">
        {content}
      </div>
    </div>
  );
};
