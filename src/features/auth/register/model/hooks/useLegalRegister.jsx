import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { sendCheckEmailRegisterLegal } from '../../../../../shared/api/auth/registerApi';
import { normalizePhoneForServer } from '../../../../../shared/utils/formatters';

export const useLegalRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendCheckEmailRegisterLegal,
    onSuccess: (data) => {
      const precheckId = data?.precheck_id;
      if (!precheckId) {
        console.error('Не удалось получить идентификатор пречека');
        return;
      }

      navigate('/register/confirm', { replace: true });
    },
  });

  const onSubmit = (formData) => {
    const normalizedData = {
      ...formData,
      phone: normalizePhoneForServer(formData.phone),
    };

    mutation.mutate(normalizedData);
  };

  return {
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
