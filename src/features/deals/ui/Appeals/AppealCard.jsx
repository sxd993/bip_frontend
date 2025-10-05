import { useState } from 'react';
import { ReplyModal } from '../Reply/ReplyModal';
import { formatDate } from '../../../../shared/utils/formatters';

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

  const getInfoStatusTone = () => {
    const status = appeal?.info?.status?.toLowerCase() || '';

    if (status.includes('закры') || status.includes('реш')) {
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    }

    if (status.includes('откл') || status.includes('ошиб')) {
      return 'bg-red-100 text-red-800 border border-red-200';
    }

    if (status.includes('ожид') || status.includes('нов')) {
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    }

    return 'bg-blue-100 text-blue-800 border border-blue-200';
  };

  const handleReply = () => {
    setIsReplyModalOpen(true);
  };

  return (
    <div className="bg-white border-2 border-red-200 rounded-3xl px-6 py-6">
      <div className='flex flex-col justify-around'>
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

        {appeal?.info && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Статус обращения:</span>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold ${getInfoStatusTone()}`}>
                <span className="h-2 w-2 rounded-full bg-current" />
                {appeal.info.status}
              </span>
            </div>
            {appeal?.info.date && (
              < div className="text-sm text-gray-500">
                Дата последнего изменения {formatDate(appeal.info.date)}
              </div>
            )}
          </div>
        )}
      </div>

      {
        appeal.opportunity && Number(appeal.opportunity) > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-red-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Сумма сделки:</span>
              <span className="text-lg font-bold text-red-600">
                {Number(appeal.opportunity).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        )
      }

      {
        appeal.can_reply && (
          <div className="mt-6 pt-4 border-t-2 border-red-100">
            <button
              onClick={handleReply}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-3xl transition-colors duration-300 flex items-center justify-center gap-2 font-bold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ответить
            </button>
          </div>
        )
      }

      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        appealId={appeal.id}
        appealData={appeal}
      />
    </div >
  );
};

export default AppealCard;
