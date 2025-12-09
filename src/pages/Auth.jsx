import Register from '../features/register/ui/Register';
import Login from '../features/login/ui/Login';
import { useAuthPage } from './hooks/useAuthPage';

export const Auth = () => {
    const {
        isLoading,
        error,
        currentStage,
        setCurrentStage,
        defaultUserType,
        defaultLegalType,
        employeePrefill,
        title,
    } = useAuthPage();

   if (isLoading) {
        return <>Загрузка...</>;
   }
   
    if (error) {
        return <div>Ошибка загрузки данных</div>;
    }

    return (
        <div className="py-15 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16 hidden lg:block">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
                        {title}
                    </h1>
                </div>

                <div className="max-w-3xl mx-auto">
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