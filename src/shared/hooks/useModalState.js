import { useState } from 'react';

/**
 * Хук для управления состоянием модальных окон
 * с поддержкой success/error экранов
 */
export const useModalState = (options = {}) => {
  const {
    onSuccessTimeout = 2000,
    onErrorTimeout = null
  } = options;
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Показать экран успеха
  const showSuccess = (timeout = onSuccessTimeout) => {
    setIsSuccess(true);
    setIsError(false);
    setErrorMessage('');
    
    if (timeout) {
      setTimeout(() => {
        setIsSuccess(false);
      }, timeout);
    }
  };

  // Показать экран ошибки
  const showError = (message, timeout = onErrorTimeout) => {
    setIsError(true);
    setErrorMessage(message);
    setIsSuccess(false);
    
    if (timeout) {
      setTimeout(() => {
        setIsError(false);
        setErrorMessage('');
      }, timeout);
    }
  };

  // Сбросить все состояния
  const reset = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
    setIsLoading(false);
  };

  // Обертка для выполнения async операций
  const executeAsync = async (asyncFn, options = {}) => {
    const {
      errorMessage: customErrorMessage = 'Произошла ошибка',
      onSuccess,
      onError
    } = options;
    
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');
      
      const result = await asyncFn();
      
      showSuccess();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return { success: true, data: result };
    } catch (error) {
      const message = error?.response?.data?.message || 
                     error?.message || 
                     customErrorMessage;
      
      showError(message);
      
      if (onError) {
        onError(error);
      }
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Состояния
    isSuccess,
    isError,
    errorMessage,
    isLoading,
    
    // Методы
    showSuccess,
    showError,
    reset,
    executeAsync,
    
    // Сеттеры для ручного управления
    setIsLoading
  };
};
