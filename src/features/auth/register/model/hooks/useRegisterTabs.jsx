import { useCallback, useEffect, useMemo, useState } from 'react';

export const useRegisterTabs = ({
  defaultUserType = 'physical',
  defaultLegalType = 'director',
} = {}) => {
  const [userType, setUserType] = useState(defaultUserType || 'physical');
  const [legalType, setLegalType] = useState(defaultLegalType || 'director');

  useEffect(() => {
    if (defaultUserType) {
      setUserType(defaultUserType);
    }
  }, [defaultUserType]);

  useEffect(() => {
    if (defaultLegalType) {
      setLegalType(defaultLegalType);
    }
  }, [defaultLegalType]);

  const selectPhysical = useCallback(() => {
    setUserType('physical');
  }, []);

  const selectLegal = useCallback(() => {
    setUserType('legal');
  }, []);

  const activeFormId = useMemo(() => {
    if (userType === 'physical') {
      return 'register-physical-form';
    }
    if (userType === 'legal' && legalType === 'employee') {
      return 'register-employee-form';
    }
    return 'register-legal-form';
  }, [userType, legalType]);

  return {
    userType,
    legalType,
    selectPhysical,
    selectLegal,
    setLegalType,
    activeFormId,
  };
};