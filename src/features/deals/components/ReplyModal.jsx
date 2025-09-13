import { useDealFiles } from '../hooks/useDealFiles';
import { useReplyModal } from '../hooks/useReplyModal';
import { Modal } from '../../../shared/ui/Modal';
import SuccessScreen from '../../../shared/components/SuccessScreen';
import ReplyForm from './ReplyForm';
import { downloadFileApi } from '../api/dealsApi';

// Утилита для форматирования размера файлов
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Компонент списка файлов
const FilesList = ({ files, isLoading }) => {
  const downloadDocument = async (documentId, fileName) => {
    try {
      const doc = files.find(d => d.id === documentId);
      if (doc?.url) {
        const link = document.createElement('a');
        link.href = doc.url;
        link.download = fileName || doc.name || 'document';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      const blob = await downloadFileApi(documentId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка скачивания документа:', error);
      alert('Ошибка при скачивании файла');
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-1">
        Документы: {isLoading && <span className="text-gray-400">(загрузка...)</span>}
      </h3>
      {files.length > 0 ? (
        <div className="space-y-1">
          {files.map((doc, index) => (
            <div key={doc.id || index} className="flex items-center gap-2 p-2 bg-red-50 rounded-2xl border border-red-100">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">{doc.name}</p>
                {doc.size && (
                  <p className="text-xs text-red-500">{formatFileSize(doc.size)}</p>
                )}
              </div>
              <button
                onClick={() => downloadDocument(doc.id, doc.name)}
                className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded-2xl transition-colors flex-shrink-0"
              >
                Скачать
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          {isLoading ? 'Загрузка документов...' : 'Нет прикрепленных документов'}
        </p>
      )}
    </div>
  );
};

// Основной компонент ReplyModal
export const ReplyModal = ({ isOpen, onClose, appealId, appealData }) => {
  const { files: dealFiles, isLoading: filesLoading } = useDealFiles(appealId, true);
  const {
    message,
    setMessage,
    appealMessage,
    isLoading,
    isSuccess,
    error,
    submitReply,
    reset
  } = useReplyModal(appealId);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (message, attachedFiles) => {
    try {
      const success = await submitReply(attachedFiles);
      if (success) {
        setTimeout(() => handleClose(), 2000);
      }
    } catch (error) {
      console.error('Ошибка при отправке ответа:', error);
    }
  };

  // Экран успеха
  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Ответ отправлен" size="sm">
        <SuccessScreen 
          title="Ответ отправлен!"
          description="Ваш ответ успешно отправлен и будет обработан в ближайшее время."
        />
      </Modal>
    );
  }

  // Основной интерфейс
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Ответ на обращение" size="lg">
      <div className="px-4 py-3 space-y-3">
        {/* Отображение ошибок */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Информация по обращению */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Информация по обращению:</h3>
          <div className="bg-red-50 p-2 rounded-2xl border border-red-100 min-h-[40px] flex items-center">
            <p className="text-gray-700 text-sm">
              {isLoading ? 'Загрузка...' : (appealMessage || 'Информация недоступна')}
            </p>
          </div>
        </div>

        {/* Список документов */}
        <FilesList files={dealFiles} isLoading={filesLoading} />

        {/* Форма ответа */}
        <ReplyForm
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};