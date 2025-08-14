import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppealApi } from '../../../api/deals/dealsApi';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      appeal_type: 'GENERAL',
      title: '',
      comment: ''
    }
  });

  const appealType = watch('appeal_type');

  // Функция для конвертации файла в base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`Файл "${file.name}" превышает максимальный размер 10MB`);
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
          file: file
        }))
      );

      setSelectedFiles(prev => [...prev, ...filesWithBase64]);
    } catch (error) {
      alert('Ошибка при обработке файлов');
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const createAppealMutation = useMutation({
    mutationFn: async (data) => {
      return createAppealApi({
        appeal_type: data.appeal_type,
        title: data.title,
        comment: data.comment,
        files: selectedFiles.map(f => ({
          name: f.name,
          base64: f.base64,
          size: f.size
        }))
      });
    },
    onSuccess: (data) => {
      // Обновляем кэш
      queryClient.invalidateQueries(['current-deals']);
      queryClient.invalidateQueries(['deals-history']);
      queryClient.invalidateQueries(['deals']);
      
      alert(`Обращение успешно создано! ID сделки: ${data.deal_id}`);
      reset();
      setSelectedFiles([]);
      onClose();
    },
    onError: (error) => {
      alert(`Ошибка: ${error.message}`);
    }
  });

  const onSubmit = (data) => {
    if (!data.title.trim() || !data.comment.trim()) {
      alert('Заполните все обязательные поля');
      return;
    }
    
    createAppealMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Создать новое обращение
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
              disabled={createAppealMutation.isPending}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Тип обращения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип обращения *
            </label>
            <select
              {...register('appeal_type', { required: 'Выберите тип обращения' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="GENERAL">Общий вопрос</option>
              <option value="DEBTOR">Дебиторская задолженность</option>
            </select>
            {errors.appeal_type && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.appeal_type.message}
              </p>
            )}
          </div>

          {/* Заголовок */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тема обращения *
            </label>
            <input
              type="text"
              {...register('title', { 
                required: 'Введите тему обращения',
                minLength: { value: 3, message: 'Минимум 3 символа' }
              })}
              placeholder={appealType === 'DEBTOR' ? 'Например: Задолженность ООО Компания' : 'Например: Консультация по договору'}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание проблемы *
            </label>
            <textarea
              {...register('comment', { 
                required: 'Опишите вашу проблему',
                minLength: { value: 10, message: 'Минимум 10 символов' }
              })}
              rows={4}
              placeholder="Подробно опишите вашу ситуацию..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Файлы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Прикрепить файлы
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.xls,.xlsx"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-2">
                Максимальный размер файла: 10MB. Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG, GIF, TXT, XLS, XLSX
              </p>
            </div>
            
            {/* Список выбранных файлов */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Выбранные файлы:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 truncate">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ошибка создания */}
          {createAppealMutation.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">
                  {createAppealMutation.error.message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={createAppealMutation.isPending}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={createAppealMutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
          >
            {createAppealMutation.isPending && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {createAppealMutation.isPending ? 'Создаю...' : 'Создать обращение'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAppealModal;