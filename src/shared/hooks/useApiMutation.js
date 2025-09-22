import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApiMutation = (mutationFn, options = {}) => {
  const {
    onSuccess,
    onError,
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: async (data, variables, context) => {
      // Инвалидируем нужные запросы
      if (invalidateQueries.length > 0) {
        await Promise.all(
          invalidateQueries.map((key) => queryClient.invalidateQueries(key))
        );
      }

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
    },
    ...mutationOptions
  });

  // Упрощённый метод для вызова мутации с try/catch
  const executeAsync = async (variables, opts = {}) => {
    try {
      const data = await mutation.mutateAsync(variables, opts);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    ...mutation,
    executeAsync
  };
};
