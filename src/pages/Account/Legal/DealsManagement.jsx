import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentDealsApi, getDealsHistoryApi } from '../../../api/deals/dealsApi';
import CreateAppealModal from '../../../components/Account/Shared/CreateAppealModal';

const DealsManagement = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  // Запрос текущих сделок
  const { data: currentDeals, isLoading: currentLoading, error: currentError } = useQuery({
    queryKey: ['current-deals'],
    queryFn: getCurrentDealsApi,
    refetchInterval: 30000,
  });

  // Запрос истории сделок
  const { data: historyDeals, isLoading: historyLoading, error: historyError } = useQuery({
    queryKey: ['deals-history'],
    queryFn: getDealsHistoryApi,
    enabled: activeTab === 'history',
  });

  const getStatusColor = (stageId) => {
    const statusColors = {
      'NEW': 'bg-blue-100 text-blue-800',
      'PREPARATION': 'bg-yellow-100 text-yellow-800',
      'PREPAYMENT_INVOICE': 'bg-orange-100 text-orange-800',
      'EXECUTING': 'bg-indigo-100 text-indigo-800',
      'FINAL_INVOICE': 'bg-purple-100 text-purple-800',
      'WON': 'bg-green-100 text-green-800',
      'LOSE': 'bg-red-100 text-red-800',
    };
    
    return statusColors[stageId] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU') + ' в ' + date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const DealCard = ({ deal, showOpportunity = false }) => (
    <div className="info-item balance-item p-4 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
            {deal.title}
          </h4>
          <div className="text-xs text-gray-500">
            ID: {deal.id} • Создано: {formatDate(deal.created_at)}
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deal.stage_id)}`}>
          {deal.stage_name}
        </span>
      </div>
      
      {showOpportunity && deal.opportunity && Number(deal.opportunity) > 0 && (
        <div className="text-sm text-gray-600 mb-2">
          Сумма: {Number(deal.opportunity).toLocaleString('ru-RU')} ₽
        </div>
      )}
      
      <button 
        onClick={() => window.open(`/deal/${deal.id}`, '_blank')}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Открыть переписку →
      </button>
    </div>
  );

  return (
    <div className="section company-section">
      <div className="flex justify-between items-center mb-4">
        <h2>Обращения компании</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Новое обращение
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {user.role === 'Руководитель' 
          ? 'Управление всеми обращениями компании' 
          : 'Мои обращения от имени компании'
        }
      </p>

      {/* Табы */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('current')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'current'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Активные обращения
            {currentDeals && (
              <span className="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">
                {currentDeals.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            История
          </button>
        </div>
      </div>

      {/* Контент вкладок */}
      {activeTab === 'current' && (
        <div>
          {currentLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : currentError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{currentError.message}</p>
            </div>
          ) : !currentDeals || currentDeals.length === 0 ? (
            <div className="text-center py-8 bg-blue-50 rounded-lg">
              <p className="text-gray-600 mb-4">Нет активных обращений</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Создать первое обращение
              </button>
            </div>
          ) : (
            <div className="info-grid">
              {currentDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          {historyLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : historyError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{historyError.message}</p>
            </div>
          ) : !historyDeals || historyDeals.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">История обращений пуста</p>
            </div>
          ) : (
            <div className="info-grid">
              {historyDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} showOpportunity={true} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Модальное окно */}
      <CreateAppealModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DealsManagement;