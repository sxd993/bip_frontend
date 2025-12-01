import { useState, useCallback } from 'react';
import { useLogin } from './useLogin';
import useCaptcha from './useCaptcha';

export const useLoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('physical');

  const { login, isPending, isError, errorMessage } = useLogin();
  const {
    value: captchaValue,
    handleChange: handleCaptchaChange,
    validate: validateCaptcha,
    error: captchaError,
    CaptchaCanvas,
  } = useCaptcha({ length: 6 });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!emailOrPhone.trim() || !password.trim()) return;
      if (!validateCaptcha()) return;

      login({
        email_or_phone: emailOrPhone,
        password,
      });
    },
    [emailOrPhone, password, validateCaptcha, login],
  );

  return {
    emailOrPhone,
    password,
    userType,
    captchaValue,

    setEmailOrPhone,
    setPassword,
    setUserType,

    handleCaptchaChange,
    captchaError,
    CaptchaCanvas,

    handleSubmit,

    isPending,
    isError,
    errorMessage,
  };
};