import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useUser } from '../../entities/user/model/useUser';

export const useAuthPage = () => {
  const [searchParams] = useSearchParams();
  const { stage: stageRouteParam } = useParams();

  const inviteTokenParam = searchParams.get('inviteToken');
  const stageQueryParam = searchParams.get('stage');
  const stageParam = stageRouteParam || stageQueryParam;
  const userTypeParam = searchParams.get('userType');
  const legalTypeParam = searchParams.get('legalType');
  const inviteEmailParam = searchParams.get('email');

  const initialStage = stageParam || (inviteTokenParam ? 'register' : 'login');
  const [currentStage, setCurrentStage] = useState(initialStage);

  const { user, isLoading, error } = useUser();
  const navigate = useNavigate();

  const paramsSignatureRef = useRef({
    stage: stageParam,
    invite: inviteTokenParam,
  });

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/personal-account', { replace: true });
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    const signatureChanged =
      paramsSignatureRef.current.stage !== stageParam ||
      paramsSignatureRef.current.invite !== inviteTokenParam;

    if (!signatureChanged) {
      return;
    }

    const desiredStage = stageParam || (inviteTokenParam ? 'register' : null);
    if (desiredStage) {
      setCurrentStage(desiredStage);
    }

    paramsSignatureRef.current = {
      stage: stageParam,
      invite: inviteTokenParam,
    };
  }, [stageParam, inviteTokenParam]);

  const defaultUserType = userTypeParam || (inviteTokenParam ? 'legal' : undefined);
  const defaultLegalType = legalTypeParam || (inviteTokenParam ? 'employee' : undefined);

  const employeePrefill = useMemo(() => {
    if (!inviteTokenParam) {
      return undefined;
    }
    return {
      inviteToken: inviteTokenParam,
      email: inviteEmailParam || '',
    };
  }, [inviteTokenParam, inviteEmailParam]);

  const title = currentStage === 'register' ? 'Зарегистрироваться' : 'Войти';

  return {
    isLoading,
    error,

    currentStage,
    setCurrentStage,

    defaultUserType,
    defaultLegalType,
    employeePrefill,

    title,
  };
};