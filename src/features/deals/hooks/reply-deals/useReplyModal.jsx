import { useState, useEffect } from 'react';
import { getAppealDetailsApi, sendReplyApi } from '../../api/dealsApi';
import { MESSAGE_CONSTRAINTS } from '../../constants';

export const useReplyModal = (appealId) => {
  const [message, setMessage] = useState('');
  const [appealMessage, setAppealMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const loadAppealData = async () => {
    if (!appealId) return;

    try {
      setIsLoading(true);
      const appealDetails = await getAppealDetailsApi(appealId);
      setAppealMessage(appealDetails.message || '');
    } catch (error) {
      console.error('Ошибка загрузки данных обращения:', error);
      setAppealMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const validateMessage = () => {
    if (!message.trim()) {
      setError('Пожалуйста, введите сообщение');
      return false;
    }

    if (message.length > MESSAGE_CONSTRAINTS.MAX_LENGTH) {
      setError(`Сообщение не должно превышать ${MESSAGE_CONSTRAINTS.MAX_LENGTH} символов`);
      return false;
    }

    setError(null);
    return true;
  };

  const submitReply = async (base64Files) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await sendReplyApi(appealId, message.trim(), base64Files);
      
      if (response.success) {
        setIsSuccess(true);
        return true;
      } else {
        setError('Ошибка отправки ответа');
        return false;
      }
    } catch (error) {
      console.error('Ошибка отправки ответа:', error);
      setError('Ошибка отправки ответа. Попробуйте еще раз.');
      return false;
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const reset = () => {
    setMessage('');
    setAppealMessage('');
    setShowConfirmation(false);
    setIsSuccess(false);
    setError(null);
  };

  useEffect(() => {
    if (appealId) {
      loadAppealData();
    }
  }, [appealId]);

  return {
    message,
    setMessage,
    appealMessage,
    isLoading,
    showConfirmation,
    setShowConfirmation,
    isSuccess,
    error,
    validateMessage,
    submitReply,
    reset
  };
};