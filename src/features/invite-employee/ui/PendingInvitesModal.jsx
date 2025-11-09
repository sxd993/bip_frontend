import { Modal } from '../../../shared/ui/Modal';
import { usePendingInvites } from '../model/usePendingInvites';

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const PendingInvitesModal = ({ isOpen, onClose }) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = usePendingInvites({ enabled: isOpen });

  const invites = data?.invites || [];
  const errorMessage = error?.response?.data?.error || error?.message;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Отправленные приглашения"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Здесь отображаются приглашения, которые ещё не были использованы.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
            disabled={isFetching}
          >
            {isFetching ? 'Обновление...' : 'Обновить'}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-6">Загрузка...</div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600">
            {errorMessage || 'Не удалось загрузить список приглашений'}
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            Активных приглашений нет.
          </div>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {invites.map(invite => (
              <li
                key={invite.id}
                className="border border-gray-100 rounded-2xl p-4 bg-gray-50"
              >
                <p className="font-semibold text-gray-900">{invite.email}</p>
                <p className="text-sm text-gray-500">
                  Отправлено: {formatDate(invite.created_at)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
          >
            Закрыть
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PendingInvitesModal;
