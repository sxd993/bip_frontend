import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppealApi, getDealStagesApi } from '../api/dealsApi';

const CreateAppealModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [funnels, setFunnels] = useState([]);
  const [isLoadingFunnels, setIsLoadingFunnels] = useState(false);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      category_id: '',
      title: '',
      comment: ''
    }
  });

  // Загружаем воронки при открытии модалки
  useEffect(() => {
    if (isOpen) {
      loadFunnels();
    }
  }, [isOpen]);

  const loadFunnels = async () => {
    setIsLoadingFunnels(true);
    try {
      const data = await getDealStagesApi();
      setFunnels(data);
    } catch (error) {
      console.error('Ошибка загрузки воронок:', error);
    } finally {
      setIsLoadingFunnels(false);
    }
  };

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
          file
        }))
      );
      setSelectedFiles(prev => [...prev, ...filesWithBase64]);
    } catch (error) {
      console.error('Ошибка при обработке файлов:', error);
    }
  };

  const removeFile = (index) => setSelectedFiles(prev => prev.filter((_, i) => i !== index));

  const createAppealMutation = useMutation({
    mutationFn: async (data) => createAppealApi({
      category_id: data.category_id,
      title: data.title,
      comment: data.comment,
      files: selectedFiles.map(f => ({
        name: f.name,
        base64: f.base64,
        size: f.size
      }))
    }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['current-deals']);
      queryClient.invalidateQueries(['deals']);
      reset();
      setSelectedFiles([]);
      onClose();
    },
    onError: (error) => {
      console.error('Ошибка создания обращения:', error);
    }
  });

  const onSubmit = (data) => {
    if (!data.title.trim() || !data.comment.trim() || !data.category_id) {
      return;
    }
    createAppealMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full shadow-lg">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Новое обращение</h2>
          <button onClick={onClose} disabled={createAppealMutation.isPending} className="text-white">
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Воронка (Тип обращения) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Тип обращения *</label>
            <select
              {...register('category_id', { required: 'Выберите тип обращения' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              disabled={isLoadingFunnels}
            >
              <option value="">
                {isLoadingFunnels ? 'Загрузка...' : 'Выберите тип обращения'}
              </option>
              {funnels.map(funnel => (
                <option key={funnel.id} value={funnel.id}>
                  {funnel.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
          </div>

          {/* Заголовок */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Тема обращения *</label>
            <input
              {...register('title', { required: 'Введите тему', minLength: { value: 3, message: 'Минимум 3 символа' } })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Введите тему"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Описание *</label>
            <textarea
              {...register('comment', { required: 'Введите описание', minLength: { value: 10, message: 'Минимум 10 символов' } })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={4}
              placeholder="Описание"
            />
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
          </div>

          {/* Файлы */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Прикрепить файлы</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            {selectedFiles.map((f, i) => (
              <div key={i} className="flex items-center mt-2">
                <span className="text-sm text-gray-600">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={createAppealMutation.isPending || isLoadingFunnels}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {createAppealMutation.isPending ? 'Создание...' : 'Создать обращение'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAppealModal;