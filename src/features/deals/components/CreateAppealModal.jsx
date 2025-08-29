import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAppeal, useAppealCategories } from '../hooks/useAppeals';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
      
      reset();
      setSelectedFiles([]);
      onClose();
    } catch (error) {
      console.error('Ошибка создания обращения:', error);
      alert('Ошибка при создании обращения');
    }
  };

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative w-full max-w-2xl mx-4 md:mx-0 bg-white border-2 border-gray-100 rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Создать обращение</h2>
          <button
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors duration-200 focus:outline-none rounded-full p-1"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6">
          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Категория обращения *
            </label>
            <select
              {...register('category_id', { required: 'Выберите категорию' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-red-400 transition-colors duration-200"
              disabled={categoriesLoading}
            >
              <option value="">Выберите категорию</option>
              {categories?.map((funnel) => (
                <option key={funnel.id} value={funnel.id}>
                  {funnel.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="mt-2 text-red-600 text-sm">{errors.category_id.message}</p>
            )}
          </div>

          {/* Заголовок */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Заголовок обращения *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Введите заголовок' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
              placeholder="Краткое описание проблемы"
            />
            {errors.title && (
              <p className="mt-2 text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Подробное описание *
            </label>
            <textarea
              {...register('comment', { required: 'Введите описание' })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200 resize-none"
              placeholder="Опишите вашу проблему подробно..."
            />
            {errors.comment && (
              <p className="mt-2 text-red-600 text-sm">{errors.comment.message}</p>
            )}
          </div>

          {/* Загрузка файлов */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Прикрепить файлы (макс. 10MB каждый)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors duration-200">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600 mb-2">Нажмите для выбора файлов</p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG до 10MB</p>
              </label>
            </div>
          </div>

          {/* Список выбранных файлов */}
          {selectedFiles.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Выбранные файлы:</h4>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition-colors duration-200 font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={createAppeal.isPending}
              className="flex-1 px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createAppeal.isPending ? 'Создание...' : 'Создать обращение'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppealModal;