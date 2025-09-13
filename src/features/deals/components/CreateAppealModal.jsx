import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAppeal, useAppealCategories } from '../hooks/useAppeals';
import { Modal } from '../../../shared/ui/Modal';
import { formatFileSize } from '../utils';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: categories, isLoading: categoriesLoading } = useAppealCategories();
  const createAppeal = useCreateAppeal();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      category_id: '',
      title: '',
      comment: ''
    }
  });
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`Файл ${file.name} слишком большой (больше 10MB)`);
        return false;
      }
      return true;
    });

    try {
      const filesWithBase64 = await Promise.all(
        validFiles.map(async (file) => ({
          name: file.name,
          size: file.size,
          base64: await fileToBase64(file),
        }))
      );
      setSelectedFiles(prev => [...prev, ...filesWithBase64]);
    } catch (error) {
      console.error('Ошибка при обработке файлов:', error);
      alert('Ошибка при загрузке файлов');
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.comment.trim() || !data.category_id) {
      return;
    }

    try {
      await createAppeal.mutateAsync({
        category_id: data.category_id,
        title: data.title,
        comment: data.comment,
        files: selectedFiles.map(f => ({
          name: f.name,
          base64: f.base64,
          size: f.size
        }))
      });

      setIsSuccess(true);
      // Очищаем форму и файлы, оставляем модалку открытой с галочкой
      reset();
      setSelectedFiles([]);
    } catch (error) {
      console.error('Ошибка создания обращения:', error);
      alert('Ошибка при создании обращения');
    }
  };


  // При открытии модалки сбрасываем экран успеха и очищаем форму
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Создать обращение">
      {isSuccess ? (
        <div className="px-4 py-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-3 bg-red-50">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-800 text-lg font-bold">Обращение создано</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 space-y-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Прикрепить файлы (макс. 10MB каждый)
              </label>
              <div className="border border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-red-300 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-8 h-8 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-red-600 mb-1 font-medium text-sm">Нажмите для выбора файлов</p>
                  <p className="text-xs text-red-500">PDF, DOC, DOCX, JPG, PNG до 10MB</p>
                </label>
              </div>
            </div>

            {/* Список выбранных файлов */}
            {selectedFiles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Выбранные файлы:</h4>
                <div className="space-y-1">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 border border-red-100 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs text-gray-700 truncate">{file.name}</span>
                        <span className="text-xs text-red-500">({formatFileSize(file.size)})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                disabled={createAppeal.isPending}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createAppeal.isPending ? 'Создание...' : 'Создать обращение'}
              </button>
            </div>
          </form>
        )}
    </Modal>
  );
};

export default CreateAppealModal;