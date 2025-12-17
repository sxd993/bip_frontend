import { TextInput } from '../../../../shared/components/forms';
import { useLoginForm } from '../model/useLoginForm';
import { Link } from 'react-router-dom';

const Login = ({ setCurrentStage, isLoading }) => {
  const {
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
  } = useLoginForm();

  if (isLoading) {
    return (
      <div className="py-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">

      <div className="flex w-full gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => setUserType('physical')}
          className={`flex-1 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-bold transition ${
            userType === 'physical'
              ? 'bg-primary text-white border-0 rounded-t-lg'
              : 'bg-white text-[#8A2A27] border-2 border-[#8A2A27] rounded-lg'
          }`}
          style={{
            marginBottom: userType === 'physical' ? '0' : '8px',
            marginRight: userType === 'physical' ? '0' : '8px'
          }}
        >
          частное лицо
        </button>
  
        <button
          type="button"
          onClick={() => setUserType('legal')}
          className={`flex-1 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-bold transition ${
            userType === 'legal'
              ? 'bg-secondary text-white border-0 rounded-t-lg'
              : 'bg-white text-[#8A2A27] border-2 border-[#8A2A27] rounded-lg'
          }`}
          style={{
            marginBottom: userType === 'legal' ? '0' : '8px',
            marginLeft: userType === 'legal' ? '0' : '8px'
          }}
        >
          юридическое лицо
        </button>
      </div>
  
      <div className={`p-4 sm:p-6 lg:p-10 transition-colors duration-300 ${
        userType === 'physical' 
          ? 'bg-primary rounded-tr-lg rounded-b-lg' 
          : 'bg-secondary rounded-tl-lg rounded-b-lg'
      }`}>
  
        <div className="mb-4 sm:mb-6">
          <TextInput
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Логин"
            required
            className="placeholder-register"
          />
        </div>
  
        <div>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
            className="placeholder-register"
          />
          <div className="text-xs sm:text-sm mt-2">
            <Link to="/auth/forgot-password" className="text-white italic">
              Забыли пароль?
            </Link>
          </div>
        </div>
  
        <div className="mt-4 sm:mt-6 lg:mt-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4 mb-3 sm:mb-4">
            <label className="text-white font-semibold text-sm sm:text-base lg:text-lg text-center sm:text-left">
              Подтвердите, что вы человек: 
            </label>
            <div className="bg-white border rounded-lg px-2 sm:px-4 py-1 text-black text-base sm:text-lg lg:text-xl tracking-widest">
              <CaptchaCanvas reloadColor="#8A2A27" />
            </div>
          </div>
  
          <TextInput
            type="text"
            value={captchaValue}
            onChange={(e) => handleCaptchaChange(e.target.value)}
            placeholder="Введите символы с изображения"
            required
            className="placeholder-register"
          />
  
          {captchaError && (
            <p className="text-sm text-red-300 mt-1">{captchaError}</p>
          )}
        </div>
  
        {isError && (
          <div className="bg-red-900/30 border border-red-400 rounded-lg p-4 mt-6">
            <p className="text-red-300 text-sm text-center">
              {errorMessage || 'Ошибка при входе'}
            </p>
          </div>
        )}
      </div>
  
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 px-2 sm:px-4 lg:px-8">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center bg-primary text-white font-bold py-2 sm:py-3 px-4 sm:px-6 lg:px-8 xl:px-12 rounded-lg text-sm sm:text-base lg:text-lg w-full sm:w-1/2 order-1 sm:order-2"
        >
          {isPending ? 'Вход...' : 'войти'}
        </button>
  
        <div className="flex-shrink-0 w-full sm:w-auto text-left order-2 sm:order-1">
          <div className="text-[#8A2A27] text-sm sm:text-base">Нет аккаунта?</div>
          <button
            type="button"
            onClick={() => setCurrentStage('register')}
            className="text-[#8A2A27] italic font-semibold text-sm sm:text-base"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
