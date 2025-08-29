import { useState } from 'react';
import { useAppeals } from '../hooks/useAppeals';
import AppealCard from './AppealCard';
import CreateAppealModal from './CreateAppealModal';

const AppealsSection = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: appeals, isLoading, error } = useAppeals();

  if (isLoading) {
    return (
      <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
        <div className="text-center py-12">
          <p className="text-red-600">Ошибка загрузки: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
      {/* Заголовок */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Обращения</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Новое обращение
        </button>
      </div>

      {/* Список обращений */}
      {!appeals || appeals.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 text-gray-400 mb-6">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Нет обращений</h3>
          <p className="text-gray-500 mb-8">Создайте первое обращение, чтобы начать работу</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Создать обращение
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appeals.map((appeal) => (
            <AppealCard key={appeal.id} appeal={appeal} />
          ))}
        </div>
      )}

      <CreateAppealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AppealsSection;