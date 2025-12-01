import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha as validateCaptchaValue,
} from 'react-simple-captcha';

const DEFAULT_CAPTCHA_LENGTH = 6;

const useCaptcha = ({ length = DEFAULT_CAPTCHA_LENGTH } = {}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshTimeoutRef = useRef(null);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    loadCaptchaEnginge(length);
    setValue('');
    setError('');
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    refreshTimeoutRef.current = setTimeout(() => {
      setIsRefreshing(false);
      refreshTimeoutRef.current = null;
    }, 150);
  }, [length]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(
    () => () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    },
    [],
  );

  const handleChange = useCallback(
    (nextValue) => {
      setValue(nextValue);
      if (error) {
        setError('');
      }
    },
    [error],
  );

  const validate = useCallback(() => {
    const trimmed = value.trim();

    if (!trimmed) {
      setError('Введите символы с изображения');
      return false;
    }

    if (!validateCaptchaValue(trimmed)) {
      setError('Код не совпадает. Попробуйте снова.');
      refresh();
      return false;
    }

    setError('');
    return true;
  }, [refresh, value]);

  const CaptchaCanvas = useMemo(() => LoadCanvasTemplateNoReload, []);

  return {
    value,
    handleChange,
    validate,
    refresh,
    error,
    isRefreshing,
    CaptchaCanvas,
  };
};

export default useCaptcha;