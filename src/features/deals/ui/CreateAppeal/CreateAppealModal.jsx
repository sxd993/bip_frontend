import { Modal } from '../../../../shared/ui/Modal';
import { Loading } from '../../../../shared/ui/Loading';
import FileUploadSection from '../../../../shared/components/FileUploadSection';
import SuccessScreen from '../../../../shared/components/SuccessScreen';
import { useCreateAppealForm } from '../../hooks/useCreateAppealForm';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const {
    form,
    fileUpload,
    categories,
    states,
    actions,
    errorMessage
  } = useCreateAppealForm(isOpen, onClose);

  const { isLoading, isSuccess, isSubmitting, error } = states;
  const { handleClose } = actions;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Создать обращение">
      {isLoading ? (
        <Loading size="medium" text="Загрузка категорий..." className="py-8" />
      ) : isSuccess ? (
        <SuccessScreen
          title="Обращение создано"
          description="Ваше обращение успешно создано и будет обработано в ближайшее время."
        />
      ) : (
        <form onSubmit={form.handleSubmit} className="px-4 py-4 space-y-4">
          {/* Блок ошибок */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm">{errorMessage}</p>
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
              className="w-full px-3 py-2 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:outline-none focus:border-red-500 transition-colors duration-200"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-200"
              placeholder="Краткое описание проблемы"
            />
            {form.errors.title && (
              <p className="mt-2 text-red-600 text-sm">{form.errors.title.message}</p>
            )}
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Подробное описание *
            </label>
            <textarea
              {...form.register('comment')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-200 resize-none"
              placeholder="Опишите вашу проблему подробно..."
            />
            {form.errors.comment && (
              <p className="mt-2 text-red-600 text-sm">{form.errors.comment.message}</p>
            )}
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
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
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