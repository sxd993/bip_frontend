import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppealDetailsApi, sendReplyApi, getDealFilesApi, getLatestDealFilesApi } from '../api/dealsApi';

export const useReplyModal = (appealId) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  
  const normalizedAppealId = appealId?.toString();
  const isValidAppealId = Boolean(normalizedAppealId && normalizedAppealId !== 'undefined' && normalizedAppealId !== 'null');

  // Загрузка деталей обращения
  const appealDetailsQuery = useQuery({
    queryKey: ['appealDetails', normalizedAppealId],
    queryFn: () => getAppealDetailsApi(normalizedAppealId),
    enabled: isValidAppealId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1
  });

  // Загрузка файлов сделки  
  const dealFilesQuery = useQuery({
    queryKey: ['dealFiles', normalizedAppealId, true],
    queryFn: async () => {
      const response = await getLatestDealFilesApi(normalizedAppealId);
      return response?.files || [];
    },
    enabled: isValidAppealId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1
  });

  // Отправка ответа
  const sendReplyMutation = useMutation({
    mutationFn: ({ message, files }) => sendReplyApi(normalizedAppealId, message, files),
    onSuccess: () => {
      // Инвалидируем все связанные запросы
      queryClient.invalidateQueries(['appeals']);
      queryClient.invalidateQueries(['dealFiles', normalizedAppealId]);
      queryClient.invalidateQueries(['appealDetails', normalizedAppealId]);
    }
  });

  // Обработчики
  const handleSubmit = async (attachedFiles) => {
    if (!message.trim()) {
      throw new Error('Введите сообщение');
    }

    if (message.length > 1500) {
      throw new Error('Сообщение слишком длинное (макс. 1500 символов)');
    }

    try {
      await sendReplyMutation.mutateAsync({
        message: message.trim(),
        files: attachedFiles
      });
      return true;
    } catch (error) {
      throw error;
    }
  };

  const reset = () => {
    setMessage('');
    sendReplyMutation.reset();
  };

  // Объединенное состояние загрузки
  const isLoading = appealDetailsQuery.isLoading || dealFilesQuery.isLoading || sendReplyMutation.isPending;
  
  // Объединенные ошибки
  const error = appealDetailsQuery.error || dealFilesQuery.error || sendReplyMutation.error;
  
  return {
    // Данные
    appealMessage: appealDetailsQuery.data?.message,
    files: dealFilesQuery.data || [],
    
    // Состояния
    isLoading,
    isSuccess: sendReplyMutation.isSuccess,
    error,
    
    // UI состояние
    message,
    setMessage,
    
    // Действия
    handleSubmit,
    reset,
    
    // Дополнительно для более тонкого контроля
    isSubmitting: sendReplyMutation.isPending,
    isLoadingDetails: appealDetailsQuery.isLoading,
    isLoadingFiles: dealFilesQuery.isLoading
  };
};