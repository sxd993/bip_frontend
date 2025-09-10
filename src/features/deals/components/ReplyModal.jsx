import { useState, useEffect } from 'react';
import { getAppealDetailsApi, sendReplyApi, downloadFileApi, getFileViewUrlApi } from '../api/dealsApi';
import { useLatestDealFiles } from '../hooks/useDealFiles';
import { filesToBase64, validateFileSize } from '../utils/fileUtils';

const ReplyModal = ({ isOpen, onClose, appealId, appealData }) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [appealMessage, setAppealMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Используем новый хук для получения файлов
  const { files: dealFiles, isLoading: filesLoading } = useLatestDealFiles(appealId);

  // Загрузка данных обращения при открытии модального окна
  useEffect(() => {
    if (isOpen && appealId) {
      loadAppealData();
    }
  }, [isOpen, appealId]);

  const loadAppealData = async () => {
    try {
      setIsLoading(true);
      
      // Получаем только детали обращения (файлы загружаются через хук)
      const appealDetails = await getAppealDetailsApi(appealId);
      setAppealMessage(appealDetails.message || '');
      
    } catch (error) {
      console.error('Ошибка загрузки данных обращения:', error);
      setAppealMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Валидация размера файлов (максимум 10MB)
    const invalidFiles = files.filter(file => !validateFileSize(file, 10));
    if (invalidFiles.length > 0) {
      alert(`Некоторые файлы превышают максимальный размер 10MB: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Пожалуйста, введите сообщение');
      return;
    }

    if (message.length > 1500) {
      setError('Сообщение не должно превышать 1500 символов');
      return;
    }

    // Показываем подтверждение
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Конвертируем файлы в base64
      const base64Files = await filesToBase64(attachedFiles);
      
      // Отправляем ответ через новый API
      const response = await sendReplyApi(appealId, message.trim(), base64Files);
      
      if (response.success) {
        setIsSuccess(true);
        // Автоматически закрываем через 2 секунды
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError('Ошибка отправки ответа');
      }
      
    } catch (error) {
      console.error('Ошибка отправки ответа:', error);
      setError('Ошибка отправки ответа. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
    setError(null);
  };

  const handleClose = () => {
    setMessage('');
    setAttachedFiles([]);
    setAppealMessage('');
    setShowConfirmation(false);
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  const downloadDocument = async (documentId, fileName) => {
    try {
      // Если у документа есть прямая ссылка для скачивания
      const doc = dealFiles.find(d => d.id === documentId);
      if (doc && doc.url) {
        // Используем прямую ссылку
        const link = document.createElement('a');
        link.href = doc.url;
        link.download = fileName || doc.name || 'document';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
      
      // Если нет прямой ссылки, используем API
      const blob = await downloadFileApi(documentId);
      
      // Создаем ссылку для скачивания
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

  const openDocument = async (documentId, fileName) => {
    try {
      // Если у документа есть прямая ссылка для просмотра
      const doc = dealFiles.find(d => d.id === documentId);
      if (doc && doc.url) {
        // Открываем файл в новой вкладке
        window.open(doc.url, '_blank');
        return;
      }
      
      // Если нет прямой ссылки, получаем через API
      const fileInfo = await getFileViewUrlApi(documentId);
      
      if (fileInfo.url) {
        // Открываем файл в новой вкладке
        window.open(fileInfo.url, '_blank');
      } else {
        alert('Не удалось получить ссылку для просмотра файла');
      }
    } catch (error) {
      console.error('Ошибка открытия документа:', error);
      alert('Ошибка при открытии файла');
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
          <p className="text-gray-600 text-sm mb-3">Ваш ответ успешно отправлен и будет обработан в ближайшее время.</p>
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
          <p className="text-gray-600 text-sm mb-4">Вы уверены, что хотите отправить ответ на обращение?</p>
          
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

        <div className="p-4 space-y-4">
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

          {/* Информация для пользователя */}
          <div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[50px] flex items-center">
              <p className="text-gray-700 text-sm">
                {isLoading ? 'Загрузка...' : (appealMessage || 'Во вложении новая инфа для пользователя')}
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
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1">
                      <span className="text-sm text-blue-600 underline cursor-pointer" onClick={() => openDocument(doc.id, doc.name)}>
                        {doc.name}
                      </span>
                      {doc.size && (
                        <div className="text-xs text-gray-500">
                          {(doc.size / 1024).toFixed(1)} KB
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openDocument(doc.id, doc.name)}
                        className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        Открыть
                      </button>
                      <button
                        onClick={() => downloadDocument(doc.id, doc.name)}
                        className="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded"
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
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение с пояснениями"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[100px]"
                rows={4}
                maxLength={1500}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {message.length}/1500 символов
              </div>
            </div>

            {/* Прикрепление файлов */}
            <div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Прикрепить файлы..."
              />
              
              {/* Список прикрепленных файлов */}
              {attachedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
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
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Отправка...
                  </>
                ) : (
                  'Отправить'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
