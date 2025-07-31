import Register from './Register/Register'
import Login from './Login/Login';
import { useState, useEffect } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';

export const Auth = () => {
    const [currentStage, setCurrentStage] = useState("login");
    const { data: user, isLoading, error } = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && user && !error) {
            navigate('/personal-account', { replace: true });
        }
    }, [user, isLoading, error, navigate]);

    if (isLoading) {
        return <Loading />;
    }

    if (user && !error) {
        return null;
    }

    return (
        <div>
            {currentStage === 'login'
                ? <Login currentStage={currentStage} setCurrentStage={setCurrentStage} />
                : <Register currentStage={currentStage} setCurrentStage={setCurrentStage} />}
        </div>
    )
}