import { Modal } from '../../../shared/ui/Modal';

const RemoveEmployeeModal = ({
  employee,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  errorMessage
}) => {
  const employeeName = employee?.full_name || 'этого сотрудника';

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? undefined : onClose}
      title="Удалить сотрудника"
    >
      <div className="p-6 space-y-6">
        <p className="text-gray-700">
          Вы уверены, что хотите удалить {employeeName} из своей компании? После
          подтверждения сотрудник потеряет доступ к личному кабинету, а на его
          почту придёт уведомление.
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-gray-100">
          <button
            type="button"
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveEmployeeModal;
