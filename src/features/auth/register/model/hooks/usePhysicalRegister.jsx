import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { normalizePhoneForServer } from '../../../../../shared/utils/formatters';
import { sendCheckEmailRegisterPhysical } from '@shared/api/auth/registerApi'
import { useDispatch } from 'react-redux';
import { setRegisterPhysicalData } from '../store/RegisterPhysical.slice';

export const usePhysicalRegister = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: sendCheckEmailRegisterPhysical,
    onSuccess: () => {
      navigate('/register/confirm', { replace: true })
    },
  });


  const onSubmit = (formData) => {
    dispatch(setRegisterPhysicalData(formData))
    mutation.mutate({
      ...formData,
      phone: normalizePhoneForServer(formData.phone),
    });
  };

  return {
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
