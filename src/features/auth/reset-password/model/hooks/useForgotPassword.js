import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../api/resetPasswordApi';

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  const sendForgotPassword = async (email) => {
    return mutation.mutateAsync({ email });
  };

  return {
    sendForgotPassword,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
