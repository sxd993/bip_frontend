import { useState, useCallback } from 'react';
import { useLogin } from './useLogin';

export const useLoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('physical');

  const { login, isPending, isError, errorMessage } = useLogin();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!emailOrPhone.trim() || !password.trim()) return;

      login({
        email_or_phone: emailOrPhone,
        password,
        user_type: userType,
      });
    },
    [emailOrPhone, password, userType, login],
  );

  return {
    emailOrPhone,
    password,
    userType,

    setEmailOrPhone,
    setPassword,
    setUserType,

    handleSubmit,

    isPending,
    isError,
    errorMessage,
  };
};
