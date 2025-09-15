import { useState } from 'react';
import AppealCard from './AppealCard';
import CreateAppealModal from '../CreateAppeal/CreateAppealModal';
import { useAppeals } from './useAppeals';
import { Loading } from '../../../../shared/ui/Loading';

const AppealsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: appeals, isLoading, error } = useAppeals();

  if (isLoading) {
    return (
      <div className="py-12">
        <Loading size="medium" text="Загрузка обращений..." className="min-h-[200px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Заголовок */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-3xl transition-colors duration-300 flex items-center gap-2 font-bold"
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
          <p className="text-gray-500">У вас пока нет обращений</p>
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