import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModalState } from './useModalState';

/**
 * Расширенный хук для API мутаций с автоматической обработкой
 * успеха/ошибок и управлением состоянием модалок
 */
export const useApiMutation = (mutationFn, options = {}) => {
  const {
    // Опции для успеха
    successMessage = 'Операция выполнена успешно',
    onSuccess,
    invalidateQueries = [],
    
    // Опции для ошибок
    errorMessage = 'Произошла ошибка',
    onError,
    showErrorAlert = false,
    
    // Опции модалки
    modalOptions = {},
    
    // Опции TanStack Query
    ...mutationOptions
  } = options;

  const queryClient = useQueryClient();
  const modalState = useModalState(modalOptions);

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Показываем экран успеха
      modalState.showSuccess();
      
      // Инвалидируем запросы
      if (invalidateQueries.length > 0) {
        invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries(queryKey);
        });
      }
      
      // Вызываем кастомный onSuccess
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Получаем сообщение об ошибке
      const message = error?.response?.data?.message || 
                     error?.response?.data?.detail || 
                     error?.message || 
                     errorMessage;
      
      // Показываем ошибку в модалке
      modalState.showError(message);
      
      // Показываем alert если нужно
      if (showErrorAlert) {
        alert(message);
      }
      
      // Вызываем кастомный onError
      if (onError) {
        onError(error, variables, context);
      }
    },
    ...mutationOptions
  });

  // Удобный метод для выполнения мутации с автоматическим управлением загрузкой
  const executeAsync = async (data, options = {}) => {
    modalState.setIsLoading(true);
    
    try {
      const result = await mutation.mutateAsync(data, options);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    } finally {
      modalState.setIsLoading(false);
    }
  };

  return {
    // Оригинальная мутация TanStack Query
    ...mutation,
    
    // Состояния модалки
    ...modalState,
    
    // Удобные методы
    executeAsync,
    
    // Переопределяем isLoading чтобы учитывать и мутацию и модалку
    isLoading: mutation.isPending || modalState.isLoading
  };
};