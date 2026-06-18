import { useCallback, useEffect, useState } from 'react';

export const useRegisterTabs = ({ defaultUserType = 'physical' } = {}) => {
  const [userType, setUserType] = useState(defaultUserType || 'physical');

  useEffect(() => {
    if (defaultUserType) {
      setUserType(defaultUserType);
    }
  }, [defaultUserType]);

  const selectPhysical = useCallback(() => {
    setUserType('physical');
  }, []);

  const selectLegal = useCallback(() => {
    setUserType('legal');
  }, []);

  return {
    userType,
    selectPhysical,
    selectLegal,
  };
};
