import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentDealsApi, getDealsHistoryApi } from '../api/dealsApi';
import CreateAppealModal from './CreateAppealModal';
import './AppealsSection.css';

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
      <div className="appeal-card">
        <div className="appeal-header">
          <div className="appeal-title-section">
            <h4 className="appeal-title">{appeal.title}</h4>
            <div className="appeal-meta">
              <span className="appeal-id">#{appeal.id}</span>
              <span className="appeal-date">{formatDate(appeal.created_at)}</span>
            </div>
          </div>
          <div className={`appeal-status ${appeal.status_color}`}>
            <span className="status-icon">{appeal.status_icon}</span>
            <span className="status-label">{appeal.stage_name}</span>
          </div>
        </div>

        {showOpportunity && appeal.opportunity && Number(appeal.opportunity) > 0 && (
          <div className="appeal-opportunity">
            <span className="opportunity-label">Сумма сделки:</span>
            <span className="opportunity-amount">{Number(appeal.opportunity).toLocaleString('ru-RU')} ₽</span>
          </div>
        )}
      </div>
    );
  };

  const EmptyState = ({ title, description, actionText, onAction }) => (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {onAction && (
        <button onClick={onAction} className="empty-state-action">
          {actionText}
        </button>
      )}
    </div>
  );

  return (
    <div className="appeals-section">
      <div className="appeals-header">
        <div className="appeals-title-section">
          <h2>Обращения компании</h2>
          <p className="appeals-subtitle">
            {user.role === 'Руководитель'
              ? 'Управление всеми обращениями компании'
              : 'Мои обращения от имени компании'
            }
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="new-appeal-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Новое обращение
        </button>
      </div>

      {/* Табы */}
      <div className="appeals-tabs">
        <button
          onClick={() => setActiveTab('current')}
          className={`appeal-tab ${activeTab === 'current' ? 'active' : ''}`}
        >
          <span className="tab-label">Активные обращения</span>
          {currentAppeals && currentAppeals.length > 0 && (
            <span className="tab-badge">{currentAppeals.length}</span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`appeal-tab ${activeTab === 'history' ? 'active' : ''}`}
        >
          <span className="tab-label">История</span>
        </button>
      </div>

      {/* Контент вкладок */}
      <div className="appeals-content">
        {activeTab === 'current' && (
          <div>
            {currentLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Загрузка обращений...</p>
              </div>
            ) : currentError ? (
              <div className="error-state">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>Ошибка загрузки</h3>
                <p>{currentError.message}</p>
              </div>
            ) : !currentAppeals || currentAppeals.length === 0 ? (
              <EmptyState
                title="Нет активных обращений"
                description="Создайте первое обращение, чтобы начать работу с компанией"
                actionText="Создать обращение"
                onAction={() => setIsModalOpen(true)}
              />
            ) : (
              <div className="appeals-grid">
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
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Загрузка истории...</p>
              </div>
            ) : historyError ? (
              <div className="error-state">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>Ошибка загрузки</h3>
                <p>{historyError.message}</p>
              </div>
            ) : !historyAppeals || historyAppeals.length === 0 ? (
              <EmptyState
                title="История обращений пуста"
                description="Здесь будут отображаться все завершенные обращения"
              />
            ) : (
              <div className="appeals-grid">
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
