import { useState } from 'react';
import { PhysicalRegister } from '../components/Register/PhysicalRegister';
import { LegalRegister } from '../components/Register/LegalRegister';
import { EmployeeRegister } from '../components/Register/EmployeeRegister';

const Register = ({ currentStage, setCurrentStage }) => {
  const [userType, setUserType] = useState('physical');
  const [legalType, setLegalType] = useState('director');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 md:px-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800">Регистрация</h3>
            <p className="text-gray-600 mt-3 text-lg">Создайте аккаунт для доступа к юридическим услугам</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  userType === 'physical'
                    ? 'bg-white text-gray-800 border-2 border-gray-200'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setUserType('physical')}
              >
                Физ. лицо
              </button>
              <button
                type="button"
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  userType === 'legal'
                    ? 'bg-white text-gray-800 border-2 border-gray-200'
                    : 'text-gray-600 hover:text-gray-800'
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
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    legalType === 'director'
                      ? 'bg-white text-gray-800 border-2 border-gray-200'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setLegalType('director')}
                >
                  Руководитель компании
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    legalType === 'employee'
                      ? 'bg-white text-gray-800 border-2 border-gray-200'
                      : 'text-gray-600 hover:text-gray-800'
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

          <div className="text-center mt-8 pt-6 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStage('login')}
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
            >
              Уже есть аккаунт? Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;