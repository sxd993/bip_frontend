import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAiChat } from '../features/ai-chat/model/useAiChat';
import { ChatMessage } from '../features/ai-chat/components/ChatMessage';

const AiChatPage = () => {
  const textareaRef = useRef(null);
  const {
    messages,
    input,
    isStreaming,
    isTyping,
    isLocked,
    dealId,
    messagesEndRef,
    sendMessage,
    handleKeyDown,
    handleInputChange,
  } = useAiChat();

  return (
    <div className="px-[3%] py-4">
    <div className="max-w-6xl mx-auto h-[70vh] flex flex-col bg-slate-50 overflow-hidden rounded-xl shadow-md">

      {/* Хедер */}
      <div className="bg-[#1e3a5f] px-6 py-4 flex items-center gap-3 flex-shrink-0 shadow-md">
        <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          БП
        </div>
        <div>
          <div className="text-white font-semibold">Баукен и Партнеры</div>
          <div className="text-white/50 text-xs">ИИ-ассистент · Онлайн консультация</div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <ChatMessage isTyping />}
        <div ref={messagesEndRef} />
      </div>

      {/* Баннер успеха */}
      {isLocked && (
        <div className="flex-shrink-0 bg-emerald-50 border-t border-emerald-200 px-6 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-emerald-700">
            <span className="font-semibold">Заявка принята{dealId ? ` № ${dealId}` : ''}.</span>{' '}
            <Link to="/ai-chat" onClick={() => window.location.reload()} className="underline hover:text-emerald-900">
              Начать новую консультацию
            </Link>
          </p>
        </div>
      )}

      {/* Поле ввода */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className={`flex items-end gap-3 rounded-2xl border-2 transition-colors px-4 py-3 ${
          isLocked
            ? 'bg-gray-50 border-gray-200'
            : 'bg-white border-gray-200 focus-within:border-[#1e3a5f]'
        }`}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isStreaming || isLocked}
            placeholder={isLocked ? 'Заявка создана' : 'Опишите вашу проблему...'}
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 disabled:cursor-not-allowed overflow-y-hidden leading-relaxed"
            style={{ minHeight: '22px', maxHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming || isLocked}
            className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center transition-all disabled:opacity-25 hover:bg-[#16304f] active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-2 select-none">
          Enter — отправить · Shift+Enter — перенос
        </p>
      </div>

    </div>
    </div>
  );
};

export default AiChatPage;
