import { useDealFiles } from '../hooks/reply-deals/useDealFiles';
import { useFileManager } from '../hooks/reply-deals/useFileManager';
import { useReplyModal } from '../hooks/reply-deals/useReplyModal';
import { downloadFileApi, getFileViewUrlApi } from '../api/dealsApi';
import { formatFileSize } from '../utils';
import { MESSAGE_CONSTRAINTS } from '../constants';

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

  if (!isOpen) return null;

  // UI успешной отправки
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Ответ отправлен!</h2>
          <p className="text-gray-600 text-sm mb-3">
            Ваш ответ успешно отправлен и будет обработан в ближайшее время.
          </p>
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // UI подтверждения отправки
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-sm w-full p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Подтверждение отправки</h2>
          <p className="text-gray-600 text-sm mb-4">
            Вы уверены, что хотите отправить ответ на обращение?
          </p>

          <div className="space-y-2 mb-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-xs text-gray-700 font-medium">Сообщение:</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{message}</p>
            </div>
            {attachedFiles.length > 0 && (
              <div className="bg-gray-50 p-2 rounded-lg">
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

          <div className="flex gap-2">
            <button
              onClick={cancelSubmit}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg transition-colors text-sm"
            >
              Отмена
            </button>
            <button
              onClick={confirmSubmit}
              disabled={isLoading}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors text-sm"
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Основной UI модального окна
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-xl w-full max-h-[85vh] overflow-hidden border border-gray-200">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Ответ на обращение</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* Отображение ошибок */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
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
            <h3 className="text-sm font-medium text-gray-700 mb-2">Информация по обращению:</h3>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[50px] flex items-center">
              <p className="text-gray-700 text-sm">
                {isLoading ? 'Загрузка...' : (appealMessage || 'Информация недоступна')}
              </p>
            </div>
          </div>

          {/* Документы */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Документы: {filesLoading && <span className="text-gray-400">(загрузка...)</span>}
            </h3>
            {dealFiles.length > 0 ? (
              <div className="space-y-1">
                {dealFiles.map((doc, index) => (
                  <div key={doc.id || index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{doc.name}</p>
                      {doc.size && (
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => downloadDocument(doc.id, doc.name)}
                        className="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded transition-colors"
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Поле сообщения */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш ответ:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение с пояснениями"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[100px]"
                rows={4}
                maxLength={MESSAGE_CONSTRAINTS.MAX_LENGTH}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Минимум {MESSAGE_CONSTRAINTS.MIN_LENGTH} символ</span>
                <span>{message.length}/{MESSAGE_CONSTRAINTS.MAX_LENGTH}</span>
              </div>
            </div>

            {/* Прикрепление файлов */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Прикрепить файлы:
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Максимум 10MB на файл. Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG
              </p>

              {/* Список прикрепленных файлов */}
              {attachedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-gray-700">Прикрепленные файлы:</p>
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-700 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Кнопка отправки */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Подготовка...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Отправить ответ
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};