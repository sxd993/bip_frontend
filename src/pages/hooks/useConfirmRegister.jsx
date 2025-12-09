import { useState, useEffect } from 'react';
import { useEnterCodeForm } from '../../features/confirm-register/model/useEnterCodeForm';
import { resendRegistrationCode } from '../../features/register/api/registerApi';

export const useConfirmRegister = () => {
  const { 
    handleSubmit, 
    formState, 
    onSubmit, 
    isPending, 
    isError, 
    errorMessage,
    codeValues,
    inputRefs,
    handleCodeInput,
    handleKeyDown,
    handlePaste,
  } = useEnterCodeForm();
  
  const { isValid } = formState;
  const codeString = codeValues.join('');
  const isSubmitDisabled = !isValid || isPending || codeString.length !== 6;

  // Таймер
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleResendCode = async () => {
    if (timer > 0 || isResending) return;

    setIsResending(true);
    setResendError(null);

    try {
      await resendRegistrationCode({});
      setTimer(60);
    } catch (error) {
      setResendError(error?.response?.data?.error || error?.message || 'Не удалось отправить код');
    } finally {
      setIsResending(false);
    }
  };

  return {
    handleSubmit,
    formState,
    onSubmit,
    isPending,
    isError,
    errorMessage,
    codeValues,
    inputRefs,
    handleCodeInput,
    handleKeyDown,
    handlePaste,
    isSubmitDisabled,
    timer,
    formatTimer,
    isResending,
    resendError,
    handleResendCode,
  };
};