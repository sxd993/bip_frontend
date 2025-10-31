import AppealCard from './AppealCard';
import CreateAppealModal from '../CreateAppeal/CreateAppealModal';
import { useAppealsSection } from '../../models/hooks/useAppealsSection';
import { Loading } from '../../../../shared/ui/Loading';

const AppealsSection = () => {
  const {
    paginatedAppeals,
    modal,
    pagination,
    isLoading,
    error
  } = useAppealsSection();

  const { isModalOpen, openModal, closeModal } = modal;
  const {
    totalAppeals,
    totalPages,
    currentPage,
    startItem,
    endItem,
    goToPrevPage,
    goToNextPage,
    goToPage,
  } = pagination;


  const shouldShowPagination = totalPages > 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loading size="medium" text="Загрузка обращений..." />
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
      <div className="flex justify-center mb-8">
        <button
          onClick={openModal}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-3xl transition-colors duration-300 flex items-center gap-2 font-bold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Новое обращение
        </button>
      </div>

      {totalAppeals === 0 ? (
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
          {paginatedAppeals.map((appeal) => (
            <AppealCard key={appeal.id} appeal={appeal} />
          ))}
        </div>
      )}

      {shouldShowPagination && (
        <div className="mt-6 flex gap-4 justify-center">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-gray-200 rounded-2xl text-gray-700 disabled:opacity-40 hover:border-red-400 transition-colors duration-200"
            >
              Назад
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 text-sm rounded-2xl transition-colors duration-200 ${page === currentPage
                    ? 'bg-red-500 text-white'
                    : 'border border-gray-200 text-gray-700 hover:border-red-400'
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-gray-200 rounded-2xl text-gray-700 disabled:opacity-40 hover:border-red-400 transition-colors duration-200"
            >
              Вперед
            </button>
          </div>
        </div>
      )}

      <CreateAppealModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AppealsSection;
