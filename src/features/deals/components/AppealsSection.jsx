import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentDealsApi, getDealsHistoryApi } from '../api/dealsApi';
import CreateAppealModal from './CreateAppealModal';

const AppealsSection = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  // Запрос текущих обращений
  const { data: currentAppeals, isLoading: currentLoading, error: currentError } = useQuery({
    queryKey: ['current-deals'],
    queryFn: getCurrentDealsApi,
    refetchInterval: 30000, // Обновляем каждые 30 секунд
  });

  // Запрос истории обращений
  const { data: historyAppeals, isLoading: historyLoading, error: historyError } = useQuery({
    queryKey: ['deals-history'],
    queryFn: getDealsHistoryApi,
    enabled: activeTab === 'history',
    refetchInterval: 30000, // Обновляем каждые 30 секунд
  });

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

  const AppealCard = ({ appeal, showOpportunity = false }) => {
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{appeal.title}</h4>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">#{appeal.id}</span>
              <span>{formatDate(appeal.created_at)}</span>
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            appeal.status_color === 'green' ? 'bg-green-100 text-green-800' :
            appeal.status_color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            appeal.status_color === 'red' ? 'bg-red-100 text-red-800' :
            appeal.status_color === 'blue' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            <span className="mr-2">{appeal.status_icon}</span>
            <span>{appeal.stage_name}</span>
          </div>
        </div>

        {showOpportunity && appeal.opportunity && Number(appeal.opportunity) > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Сумма сделки:</span>
              <span className="text-lg font-bold text-green-600">{Number(appeal.opportunity).toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const EmptyState = ({ title, description, actionText, onAction }) => (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {onAction && (
        <button 
          onClick={onAction} 
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
        >
          {actionText}
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Обращения компании</h2>
          <p className="text-gray-600">
            {user.role === 'Руководитель'
              ? 'Управление всеми обращениями компании'
              : 'Мои обращения от имени компании'
            }
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Новое обращение
        </button>
      </div>

      {/* Табы */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'current'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              Активные обращения
              {currentAppeals && currentAppeals.length > 0 && (
                <span className="bg-pink-100 text-pink-600 py-1 px-2 rounded-full text-xs">
                  {currentAppeals.length}
                </span>
              )}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            История
          </button>
        </div>
      </div>

      {/* Контент вкладок */}
      <div>
        {activeTab === 'current' && (
          <div>
            {currentLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mb-4"></div>
                <p className="text-gray-500">Загрузка обращений...</p>
              </div>
            ) : currentError ? (
              <div className="text-center py-12">
                <svg className="mx-auto w-12 h-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3>
                <p className="text-gray-500">{currentError.message}</p>
              </div>
            ) : !currentAppeals || currentAppeals.length === 0 ? (
              <EmptyState
                title="Нет активных обращений"
                description="Создайте первое обращение, чтобы начать работу с компанией"
                actionText="Создать обращение"
                onAction={() => setIsModalOpen(true)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentAppeals.map((appeal) => (
                  <AppealCard key={appeal.id} appeal={appeal} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {historyLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mb-4"></div>
                <p className="text-gray-500">Загрузка истории...</p>
              </div>
            ) : historyError ? (
              <div className="text-center py-12">
                <svg className="mx-auto w-12 h-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3>
                <p className="text-gray-500">{historyError.message}</p>
              </div>
            ) : !historyAppeals || historyAppeals.length === 0 ? (
              <EmptyState
                title="История обращений пуста"
                description="Здесь будут отображаться все завершенные обращения"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {historyAppeals.map((appeal) => (
                  <AppealCard key={appeal.id} appeal={appeal} showOpportunity={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Модальное окно создания обращения */}
      <CreateAppealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AppealsSection;
