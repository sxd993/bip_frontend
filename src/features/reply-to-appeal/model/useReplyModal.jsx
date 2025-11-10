import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppealDetailsApi, sendReplyApi } from '../../../entities/deal/api/replyApi';

export const useReplyModal = (appealId) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const normalizedAppealId = appealId?.toString();
  const isValidAppealId = Boolean(normalizedAppealId && normalizedAppealId !== 'undefined' && normalizedAppealId !== 'null');

  const appealDetailsQuery = useQuery({
    queryKey: ['appealDetails', normalizedAppealId],
    queryFn: () => getAppealDetailsApi(normalizedAppealId),
    enabled: isValidAppealId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1
  });

  // Отправка ответа
  const sendReplyMutation = useMutation({
    mutationFn: ({ message, files }) => sendReplyApi(normalizedAppealId, message, files),
    onSuccess: () => {
      queryClient.invalidateQueries(['appeals']);
      queryClient.invalidateQueries(['appealDetails', normalizedAppealId]);
    }
  });

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

  return {
    // Данные из объединенного запроса
    appealMessage: appealDetailsQuery.data?.message,
    files: appealDetailsQuery.data?.files || [],

    // Состояния
    isLoading: appealDetailsQuery.isLoading,
    isSuccess: sendReplyMutation.isSuccess,
    error: appealDetailsQuery.error || sendReplyMutation.error,

    // UI состояние
    message,
    setMessage,

    // Действия
    handleSubmit,
    reset,

    // Для совместимости с существующим кодом
    isSubmitting: sendReplyMutation.isPending,
    isLoadingDetails: appealDetailsQuery.isLoading,
    isLoadingFiles: false // Файлы теперь загружаются вместе с деталями
  };
};