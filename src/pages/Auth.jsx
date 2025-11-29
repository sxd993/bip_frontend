import Register from '../features/register/ui/Register';
import Login from '../features/login/ui/Login';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useUser } from '../entities/user/model/useUser';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Auth = () => {
    const [searchParams] = useSearchParams();
    const inviteTokenParam = searchParams.get('inviteToken');
    const stageParam = searchParams.get('stage');
    const userTypeParam = searchParams.get('userType');
    const legalTypeParam = searchParams.get('legalType');
    const inviteEmailParam = searchParams.get('email');

    const initialStage = stageParam || (inviteTokenParam ? 'register' : 'login');
    const [currentStage, setCurrentStage] = useState(initialStage);
    const { user, isLoading, error } = useUser();
    const navigate = useNavigate();
    const paramsSignatureRef = useRef({
        stage: stageParam,
        invite: inviteTokenParam
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
            invite: inviteTokenParam
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
            email: inviteEmailParam || ''
        };
    }, [inviteTokenParam, inviteEmailParam]);

   if (isLoading) {
    return <>Загрузка...</>
   }
   
    if (error) return <div>Ошибка загрузки данных</div>;

    // если пользователь не авторизован, показываем форму
    return (
        <div className="py-15 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Авторизация</h1>
                </div>

                <div className="max-w-2xl mx-auto">
                    {currentStage === 'login' ? (
                        <Login currentStage={currentStage} setCurrentStage={setCurrentStage} />
                    ) : (
                        <Register
                            currentStage={currentStage}
                            setCurrentStage={setCurrentStage}
                            defaultUserType={defaultUserType}
                            defaultLegalType={defaultLegalType}
                            employeePrefill={employeePrefill}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};