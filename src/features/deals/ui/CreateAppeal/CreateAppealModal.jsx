import { useEffect, useState } from 'react';
import { Modal } from '../../../../shared/ui/Modal';
import { Loading } from '../../../../shared/ui/Loading';
import FileUploadSection from '../../../../shared/components/FileUploadSection';
import SuccessScreen from '../../../../shared/components/SuccessScreen';
import { useCreateAppealForm } from '../../models/hooks/useCreateAppealForm';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const {
    form,
    fileUpload,
    categories,
    states,
    actions,
    errorMessage
  } = useCreateAppealForm(isOpen, onClose);

  const { isLoading, isSuccess, isSubmitting, isError, error, countdown } = states;
  const { handleClose } = actions;
  
  const [titleLength, setTitleLength] = useState(0);
  const [commentLength, setCommentLength] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTitleLength(0);
      setCommentLength(0);
      setSelectedCategory('');
    }
  }, [isOpen]);

  // Сброс состояния при закрытии модального окна
  const handleCloseWithReset = () => {
    setTitleLength(0);
    setCommentLength(0);
    setSelectedCategory('');
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Создать обращение">
      {isLoading ? (
        <Loading size="medium" text="Загрузка категорий..." className="py-8" />
      ) : isSubmitting ? (
        <Loading size="medium" text="Отправка запроса..." className="py-8" />
      ) : isSuccess ? (
        <div className="px-4 py-8 flex flex-col items-center text-center space-y-4">
          <SuccessScreen
            title="Заявка создана"
            description={
              countdown !== null
                ? `Модальное окно закроется через ${countdown}...`
                : 'Модальное окно скоро закроется.'
            }
          />
          <button
            type="button"
            onClick={handleCloseWithReset}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl transition-colors duration-200 font-bold"
          >
            Закрыть сейчас
          </button>
        </div>
      ) : isError ? (
        <div className="px-4 py-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-2 bg-red-50">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-800 text-lg font-bold">Не удалось создать заявку</p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md">{errorMessage}</p>
          <button
            type="button"
            onClick={handleCloseWithReset}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
          >
            Закрыть окно
          </button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit} className="px-4 py-4 space-y-4">
          {/* Блок ошибок */}
          {error && !isError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h4 className="text-red-800 font-medium text-sm mb-1">Ошибка валидации</h4>
                  <p className="text-red-700 text-sm leading-relaxed">{errorMessage}</p>
                  {errorMessage.includes('title') && (
                    <p className="text-red-600 text-xs mt-1">• Заголовок должен содержать минимум 3 символа</p>
                  )}
                  {errorMessage.includes('comment') && (
                    <p className="text-red-600 text-xs mt-1">• Описание должно содержать минимум 10 символов</p>
                  )}
                  {errorMessage.includes('category') && (
                    <p className="text-red-600 text-xs mt-1">• Необходимо выбрать категорию обращения</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория обращения *
            </label>
            <select
              {...form.register('category_id')}
              onChange={(e) => {
                form.register('category_id').onChange(e);
                setSelectedCategory(e.target.value);
              }}
              className={`w-full px-3 py-2 border rounded-2xl bg-white text-gray-900 focus:outline-none transition-colors duration-200 ${
                form.errors.category_id ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
              }`}
            >
              <option value="">Выберите категорию</option>
              {categories?.map((funnel) => (
                <option key={funnel.id} value={funnel.category_id}>
                  {funnel.title}
                </option>
              ))}
            </select>
            {form.errors.category_id && (
              <p className="mt-2 text-red-600 text-sm">{form.errors.category_id.message}</p>
            )}
          </div>

          {/* Заголовок */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Заголовок обращения *
            </label>
            <input
              type="text"
              {...form.register('title')}
              onChange={(e) => {
                form.register('title').onChange(e);
                setTitleLength(e.target.value.length);
              }}
              className={`w-full px-3 py-2 border rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-colors duration-200 ${
                form.errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
              }`}
              placeholder="Краткое описание проблемы"
            />
            <div className="mt-1 flex justify-between items-center">
              {form.errors.title && (
                <p className="text-red-600 text-sm">{form.errors.title.message}</p>
              )}
              <p className={`text-xs ml-auto ${titleLength < 3 ? 'text-red-500' : 'text-gray-500'}`}>
                {titleLength}/3 минимум
              </p>
            </div>
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Подробное описание *
            </label>
            <textarea
              {...form.register('comment')}
              onChange={(e) => {
                form.register('comment').onChange(e);
                setCommentLength(e.target.value.length);
              }}
              rows={3}
              className={`w-full px-3 py-2 border rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-colors duration-200 resize-none ${
                form.errors.comment ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
              }`}
              placeholder="Опишите вашу проблему подробно..."
            />
            <div className="mt-1 flex justify-between items-center">
              {form.errors.comment && (
                <p className="text-red-600 text-sm">{form.errors.comment.message}</p>
              )}
              <p className={`text-xs ml-auto ${commentLength < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                {commentLength}/10 минимум
              </p>
            </div>
          </div>

          {/* Загрузка файлов */}
          <FileUploadSection
            attachedFiles={fileUpload.attachedFiles}
            fileErrors={fileUpload.fileErrors}
            onFilesAdd={fileUpload.addFiles}
            onFileRemove={fileUpload.removeFile}
          />

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCloseWithReset}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting || titleLength < 3 || commentLength < 10 || !selectedCategory}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Создание...' : 'Создать обращение'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CreateAppealModal;
