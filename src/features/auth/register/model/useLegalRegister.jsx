import { useAuth } from '../../login/model/useAuth';
import { registerLegalEntityApi } from '../../../../shared/api/auth/registerApi';
import { normalizePhoneForServer } from '../../../../shared/utils/formatters';

export const useLegalRegister = () => {
  const { registerMutation, isRegisterPending, registerError } = useAuth();

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      phone: normalizePhoneForServer(formData.phone),
    };

    registerMutation.mutate({
      registerFn: registerLegalEntityApi,
      payload,
    });
  };

  return {
    onSubmit,
    isPending: isRegisterPending,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError,
    errorMessage: registerError,
  };
};
