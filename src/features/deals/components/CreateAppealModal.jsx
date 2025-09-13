import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppealCategories } from '../hooks/useAppeals';
import { createAppealApi } from '../api/dealsApi';
import { Modal } from '../../../shared/ui/Modal';
import { Loading } from '../../../shared/ui/Loading';
import { useFileUpload } from '../../../shared/hooks/useFileUpload';
import { useApiMutation } from '../../../shared/hooks/useApiMutation';
import FileUploadSection from '../../../shared/components/FileUploadSection';
import SuccessScreen from '../../../shared/components/SuccessScreen';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const { data: categories, isLoading: categoriesLoading } = useAppealCategories();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      category_id: '',
      title: '',
      comment: ''
    }
  });

  const {
    attachedFiles,
    fileErrors,
    addFiles,
    removeFile,
    clearFiles,
    getBase64Files
  } = useFileUpload();

  // Используем общий хук для API мутаций
  const createAppealMutation = useApiMutation(createAppealApi, {
    successMessage: 'Обращение успешно создано!',
    errorMessage: 'Ошибка при создании обращения',
    invalidateQueries: [['appeals']], // Обновляем список обращений
    modalOptions: {
      onSuccessTimeout: 2000
    }
  });

  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.comment.trim() || !data.category_id) {
      return;
    }

    try {
      const base64Files = await getBase64Files();
      
      const result = await createAppealMutation.executeAsync({
        category_id: data.category_id,
        title: data.title,
        comment: data.comment,
        files: base64Files
      });

      if (result.success) {
        reset();
        clearFiles();
      }
    } catch (error) {
      console.error('Ошибка создания обращения:', error);
    }
  };

  // При открытии модалки сбрасываем состояния
  useEffect(() => {
    if (isOpen) {
      createAppealMutation.reset();
    }
  }, [isOpen]);

  const handleClose = () => {
    createAppealMutation.reset();
    reset();
    clearFiles();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Создать обращение">
      {categoriesLoading ? (
        <Loading size="medium" text="Загрузка категорий..." className="py-8" />
      ) : createAppealMutation.isSuccess ? (
        <SuccessScreen 
          title="Обращение создано"
          description="Ваше обращение успешно создано и будет обработано в ближайшее время."
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 space-y-4">
          {/* Отображение ошибок */}
          {createAppealMutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm">{createAppealMutation.errorMessage}</p>
              </div>
            </div>
          )}

          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория обращения *
            </label>
            <select
              {...register('category_id', { required: 'Выберите категорию' })}
              className="w-full px-3 py-2 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:outline-none focus:border-red-500 transition-colors duration-200"
              disabled={categoriesLoading}
            >
              <option value="">Выберите категорию</option>
              {categories?.map((funnel) => (
                <option key={funnel.id} value={funnel.category_id}>
                  {funnel.title}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="mt-2 text-red-600 text-sm">{errors.category_id.message}</p>
            )}
          </div>

          {/* Заголовок */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Заголовок обращения *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Введите заголовок' })}
              className="w-full px-3 py-2 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-200"
              placeholder="Краткое описание проблемы"
            />
            {errors.title && (
              <p className="mt-2 text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Подробное описание *
            </label>
            <textarea
              {...register('comment', { required: 'Введите описание' })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-200 resize-none"
              placeholder="Опишите вашу проблему подробно..."
            />
            {errors.comment && (
              <p className="mt-2 text-red-600 text-sm">{errors.comment.message}</p>
            )}
          </div>

          {/* Загрузка файлов */}
          <FileUploadSection
            attachedFiles={attachedFiles}
            fileErrors={fileErrors}
            onFilesAdd={addFiles}
            onFileRemove={removeFile}
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
              disabled={createAppealMutation.isLoading}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createAppealMutation.isLoading ? 'Создание...' : 'Создать обращение'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CreateAppealModal;