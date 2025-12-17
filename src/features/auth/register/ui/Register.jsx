import { EmployeeRegister } from '../model/types/EmployeeRegister';
import { RegisterLegalForm } from '../model/types/RegisterLegalForm';
import { RegisterPhysicalForm } from '../model/types/RegisterPhysicalForm';
import { useRegisterTabs } from '../model/hooks/useRegisterTabs';

const Register = ({
  setCurrentStage,
  defaultUserType = 'physical',
  defaultLegalType = 'director',
  employeePrefill
}) => {
  const {
    userType,
    legalType,
    selectPhysical,
    selectLegal,
    activeFormId,
  } = useRegisterTabs({ defaultUserType, defaultLegalType });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex w-full gap-1 sm:gap-2">
        <button
          type="button"
          onClick={selectPhysical}
          className={`flex-1 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-bold transition ${userType === 'physical'
            ? 'bg-secondary text-white border-0 rounded-t-lg'
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
          onClick={selectLegal}
          className={`flex-1 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-bold transition ${userType === 'legal'
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

      <div
        className={`p-4 sm:p-6 lg:p-10 bg-secondary rounded-b-lg transition-colors duration-300 ${userType === 'physical' ? 'rounded-tr-lg' : 'rounded-tl-lg'
          }`}
      >
        <div className="mt-2 sm:mt-4">
          {userType === 'physical' && <RegisterPhysicalForm />}
          {userType === 'legal' && legalType === 'director' && <RegisterLegalForm />}
          {userType === 'legal' && legalType === 'employee' && (
            <EmployeeRegister prefill={employeePrefill} />
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 px-2 sm:px-4 lg:px-8">
        <div className="flex-shrink-0 w-full sm:w-auto text-left order-2 sm:order-1">
          <button
            type="button"
            onClick={() => setCurrentStage('login')}
            className="text-left"
          >
            <div className="text-[#8A2A27] text-sm sm:text-base">Уже есть аккаунт?</div>
            <span className="text-[#8A2A27] italic font-semibold text-sm sm:text-base">
              Войти
            </span>
          </button>
        </div>

        <button
          type="submit"
          form={activeFormId}
          className="flex items-center justify-center bg-primary text-white font-bold py-2 sm:py-3 px-4 sm:px-6 lg:px-8 xl:px-12 rounded-lg text-sm sm:text-base lg:text-lg w-full sm:w-1/2 order-1 sm:order-2"
        >
          зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Register;