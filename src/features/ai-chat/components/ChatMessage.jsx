const BotAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold tracking-tight shadow-sm">
    БП
  </div>
);

export const ChatMessage = ({ role, content, isTyping }) => {
  const isUser = role === 'user';

  if (isTyping) {
    return (
      <div className="flex items-end gap-2.5">
        <BotAvatar />
        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3.5 shadow-sm">
          <div className="flex gap-1.5 items-center">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '160ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '320ms' }} />
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2.5">
        <div className="max-w-[78%] bg-[#1e3a5f] text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-sm text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2.5">
      <BotAvatar />
      <div className="max-w-[78%] bg-white border border-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm text-sm leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};
