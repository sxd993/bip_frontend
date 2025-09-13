import { useState } from 'react';
import { PhysicalRegister } from '../components/Register/PhysicalRegister';
import { LegalRegister } from '../components/Register/LegalRegister';
import { EmployeeRegister } from '../components/Register/EmployeeRegister';

const Register = ({ currentStage, setCurrentStage }) => {
  const [userType, setUserType] = useState('physical');
  const [legalType, setLegalType] = useState('director');

  return (
    <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
      <div className="text-center mb-10">
        <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Регистрация</h3>
        </div>
      </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex bg-red-100 rounded-2xl p-1">
              <button
                type="button"
                className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
                  userType === 'physical'
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                }`}
                onClick={() => setUserType('physical')}
              >
                Физ. лицо
              </button>
              <button
                type="button"
                className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
                  userType === 'legal'
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                }`}
                onClick={() => setUserType('legal')}
              >
                Юр. лицо
              </button>
            </div>
          </div>

          {/* Если выбрано юр. лицо, показываем дополнительный выбор */}
          {userType === 'legal' && (
            <div className="flex justify-center mb-8">
              <div className="flex bg-red-100 rounded-2xl p-1">
                <button
                  type="button"
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                    legalType === 'director'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                  }`}
                  onClick={() => setLegalType('director')}
                >
                  Руководитель компании
                </button>
                <button
                  type="button"
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                    legalType === 'employee'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                  }`}
                  onClick={() => setLegalType('employee')}
                >
                  Сотрудник компании
                </button>
              </div>
            </div>
          )}

          {/* Отображаем нужную форму */}
          <div className="mt-8">
            {userType === 'physical' && <PhysicalRegister />}
            {userType === 'legal' && legalType === 'director' && <LegalRegister />}
            {userType === 'legal' && legalType === 'employee' && <EmployeeRegister />}
          </div>

          <div className="text-center mt-8 pt-6 border-t-2 border-red-100">
            <button
              type="button"
              onClick={() => setCurrentStage('login')}
              className="font-medium transition-colors duration-200"
            >
              <span className="text-gray-600">Уже есть аккаунт? </span>
              <span className="text-red-600 hover:text-red-700">Войти</span>
            </button>
          </div>
    </div>
  );
};

export default Register;