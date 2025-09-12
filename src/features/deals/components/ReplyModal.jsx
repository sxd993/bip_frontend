import { useDealFiles } from '../hooks/reply-deals/useDealFiles';
import { useFileManager } from '../hooks/reply-deals/useFileManager';
import { useReplyModal } from '../hooks/reply-deals/useReplyModal';
import { downloadFileApi, getFileViewUrlApi } from '../api/dealsApi';
import { formatFileSize } from '../utils';
import { MESSAGE_CONSTRAINTS } from '../constants';
import { Modal } from '../../../shared/ui/Modal';

export const ReplyModal = ({ isOpen, onClose, appealId, appealData }) => {
  const { files: dealFiles, isLoading: filesLoading } = useDealFiles(appealId, true);
  const {
    attachedFiles,
    fileErrors,
    addFiles,
    removeFile,
    clearFiles,
    getBase64Files
  } = useFileManager();

  const {
    message,
    setMessage,
    appealMessage,
    isLoading,
    showConfirmation,
    setShowConfirmation,
    isSuccess,
    error,
    validateMessage,
    submitReply,
    reset
  } = useReplyModal(appealId);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    addFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMessage()) return;

    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      const base64Files = await getBase64Files();
      const success = await submitReply(base64Files);

      if (success) {
        setTimeout(() => handleClose(), 2000);
      }
    } catch (error) {
      console.error('Ошибка при подготовке файлов:', error);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  const handleClose = () => {
    reset();
    clearFiles();
    onClose();
  };

  const downloadDocument = async (documentId, fileName) => {
    try {
      const doc = dealFiles.find(d => d.id === documentId);
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

  // UI успешной отправки
  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Ответ отправлен" size="sm">
        <div className="px-4 py-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center mb-2 bg-red-50">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-800 text-base font-bold">Ответ отправлен!</p>
          <p className="text-gray-600 text-sm mt-1">
            Ваш ответ успешно отправлен и будет обработан в ближайшее время.
          </p>
        </div>
      </Modal>
    );
  }

  // UI подтверждения отправки
  if (showConfirmation) {
    return (
      <Modal isOpen={isOpen} onClose={cancelSubmit} title="Подтверждение отправки" size="sm">
        <div className="px-4 py-3 space-y-3">
          <p className="text-gray-600 text-sm">
            Вы уверены, что хотите отправить ответ на обращение?
          </p>

          <div className="space-y-2">
            <div className="bg-red-50 p-2 rounded-2xl border border-red-100">
              <p className="text-xs text-gray-700 font-medium">Сообщение:</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{message}</p>
            </div>
            {attachedFiles.length > 0 && (
              <div className="bg-red-50 p-2 rounded-2xl border border-red-100">
                <p className="text-xs text-gray-700 font-medium">Файлы ({attachedFiles.length}):</p>
                <div className="mt-1">
                  {attachedFiles.slice(0, 2).map((file, index) => (
                    <p key={index} className="text-xs text-gray-600">• {file.name}</p>
                  ))}
                  {attachedFiles.length > 2 && (
                    <p className="text-xs text-gray-500">... и еще {attachedFiles.length - 2}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={cancelSubmit}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium text-sm"
            >
              Отмена
            </button>
            <button
              onClick={confirmSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-3xl transition-colors duration-200 font-bold text-sm"
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Основной UI модального окна
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

        {/* Отображение ошибок файлов */}
        {fileErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-2">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-red-700 text-sm font-medium mb-1">Ошибки файлов:</p>
                {fileErrors.map((error, index) => (
                  <p key={index} className="text-red-600 text-xs">• {error}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Информация для пользователя */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Информация по обращению:</h3>
          <div className="bg-red-50 p-2 rounded-2xl border border-red-100 min-h-[40px] flex items-center">
            <p className="text-gray-700 text-sm">
              {isLoading ? 'Загрузка...' : (appealMessage || 'Информация недоступна')}
            </p>
          </div>
        </div>

        {/* Документы */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Документы: {filesLoading && <span className="text-gray-400">(загрузка...)</span>}
          </h3>
          {dealFiles.length > 0 ? (
            <div className="space-y-1">
              {dealFiles.map((doc, index) => (
                <div key={doc.id || index} className="flex items-center gap-2 p-2 bg-red-50 rounded-2xl border border-red-100">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate">{doc.name}</p>
                    {doc.size && (
                      <p className="text-xs text-red-500">
                        {formatFileSize(doc.size)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => downloadDocument(doc.id, doc.name)}
                      className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded-2xl transition-colors"
                    >
                      Скачать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {filesLoading ? 'Загрузка документов...' : 'Нет прикрепленных документов'}
            </p>
          )}
        </div>

        {/* Форма ответа */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Поле сообщения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ваш ответ:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение с пояснениями"
              className="w-full p-2 border border-gray-200 rounded-2xl resize-none focus:border-red-500 focus:outline-none min-h-[80px]"
              rows={3}
              maxLength={MESSAGE_CONSTRAINTS.MAX_LENGTH}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Минимум {MESSAGE_CONSTRAINTS.MIN_LENGTH} символ</span>
              <span>{message.length}/{MESSAGE_CONSTRAINTS.MAX_LENGTH}</span>
            </div>
          </div>

          {/* Прикрепление файлов */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Прикрепить файлы:
            </label>
            <div className="border border-dashed border-gray-200 rounded-2xl p-3 text-center hover:border-red-300 transition-colors duration-200">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload-reply"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload-reply" className="cursor-pointer">
                <svg className="w-6 h-6 mx-auto mb-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-red-600 mb-1 font-medium text-xs">Нажмите для выбора файлов</p>
                <p className="text-xs text-red-500">PDF, DOC, DOCX, JPG, PNG до 10MB</p>
              </label>
            </div>

            {/* Список прикрепленных файлов */}
            {attachedFiles.length > 0 && (
              <div className="mt-1 space-y-1">
                <p className="text-xs font-medium text-gray-700">Прикрепленные файлы:</p>
                {attachedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-1 bg-red-50 rounded-2xl border border-red-100">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <svg className="w-3 h-3 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-700 truncate">{file.name}</p>
                        <p className="text-xs text-red-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 ml-1 flex-shrink-0"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium text-sm"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-3xl transition-colors duration-200 flex items-center justify-center gap-2 font-bold text-sm"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  Подготовка...
                </>
              ) : (
                'Отправить ответ'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};