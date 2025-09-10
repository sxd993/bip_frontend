import { useState } from 'react';
import ReplyModal from './ReplyModal';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' в ' + date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const AppealCard = ({ appeal }) => {
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const getStatusColor = () => {
      const colorMap = {
        'green': 'bg-green-100 text-green-800',
        'yellow': 'bg-yellow-100 text-yellow-800',
        'red': 'bg-red-100 text-red-800',
        'blue': 'bg-blue-100 text-blue-800'
      };
      return colorMap[appeal.status_color] || 'bg-gray-100 text-gray-800';
    };

    // Обработчик для кнопки "Ответить"
    const handleReply = () => {
      setIsReplyModalOpen(true);
    };
  
    return (
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-red-200 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{appeal.title}</h4>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-lg">#{appeal.id}</span>
              <span>{formatDate(appeal.created_at)}</span>
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {appeal.status_icon && <span className="mr-2">{appeal.status_icon}</span>}
            <span>{appeal.stage_name}</span>
          </div>
        </div>
  
        {appeal.opportunity && Number(appeal.opportunity) > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Сумма сделки:</span>
              <span className="text-lg font-bold text-green-600">
                {Number(appeal.opportunity).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        )}

        {/* Кнопка "Ответить" - показывается только если can_reply = true */}
        {appeal.can_reply && (
          <div className="mt-6 pt-4 border-t-2 border-gray-100">
            <button
              onClick={handleReply}
              className="w-full bg-red-400 hover:bg-red-500 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ответить
            </button>
          </div>
        )}

        {/* Модальное окно для ответа */}
        <ReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          appealId={appeal.id}
          appealData={appeal}
        />
      </div>
    );
  };
  
  export default AppealCard;