import { useSearchParams } from 'react-router-dom';
import { Loading } from '@/shared/ui/Loading';
import AppealsSection from '@/features/deal/view-appeals/ui/AppealsSection';
import { useCompanyData } from '../model/useCompanyData';

const VALID_SECTIONS = ['company', 'appeals'];
const DEFAULT_SECTION = 'appeals';

const formatBalance = (value) => {
  if (value == null) return '—';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(value);
};

export const CompanyAccount = ({ user, isLoading: userLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('tab') || DEFAULT_SECTION;

  const { data: company, isLoading: companyLoading, error } = useCompanyData();

  if (!VALID_SECTIONS.includes(activeSection)) {
    setSearchParams({ tab: DEFAULT_SECTION }, { replace: true });
  }

  const handleTabChange = (section) => {
    setSearchParams({ tab: section });
  };

  if (userLoading || companyLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="py-24 text-center text-gray-600">
        Не удалось загрузить данные компании
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Личный кабинет компании
          </h1>
          <div className="w-24 h-1 bg-red-200 mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            {company?.name || user?.company?.name || 'Управление данными и обращениями'}
          </p>
        </div>

        <div className="bg-white border-2 border-red-200 rounded-3xl overflow-hidden">
          <div className="flex border-b-2 border-red-200 overflow-x-auto">
            <button
              type="button"
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeSection === 'company'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
              }`}
              onClick={() => handleTabChange('company')}
            >
              Данные компании
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeSection === 'appeals'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
              }`}
              onClick={() => handleTabChange('appeals')}
            >
              Обращения
            </button>
          </div>

          <div className="p-8 md:p-12">
            {activeSection === 'company' && (
              <div>
                <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50 mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                    Данные компании
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="border-2 border-gray-100 p-6 rounded-2xl">
                    <span className="block text-sm font-medium text-gray-600 mb-2">
                      Название
                    </span>
                    <span className="text-lg text-gray-800">{company?.name || '—'}</span>
                  </div>
                  <div className="border-2 border-gray-100 p-6 rounded-2xl">
                    <span className="block text-sm font-medium text-gray-600 mb-2">ИНН</span>
                    <span className="text-lg text-gray-800">{company?.inn || '—'}</span>
                  </div>
                  <div className="border-2 border-gray-100 p-6 rounded-2xl">
                    <span className="block text-sm font-medium text-gray-600 mb-2">
                      Телефон
                    </span>
                    <span className="text-lg text-gray-800">{company?.phone || '—'}</span>
                  </div>
                  <div className="border-2 border-gray-100 p-6 rounded-2xl">
                    <span className="block text-sm font-medium text-gray-600 mb-2">Email</span>
                    <span className="text-lg text-gray-800">{company?.email || '—'}</span>
                  </div>
                  <div className="border-2 border-gray-100 p-6 rounded-2xl">
                    <span className="block text-sm font-medium text-gray-600 mb-2">
                      Баланс компании
                    </span>
                    <span className="text-lg text-gray-800">
                      {formatBalance(company?.balance)}
                    </span>
                  </div>
                </div>

                {user && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Руководитель
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="border-2 border-gray-100 p-6 rounded-2xl">
                        <span className="block text-sm font-medium text-gray-600 mb-2">ФИО</span>
                        <span className="text-lg text-gray-800">
                          {user.last_name} {user.first_name} {user.second_name}
                        </span>
                      </div>
                      <div className="border-2 border-gray-100 p-6 rounded-2xl">
                        <span className="block text-sm font-medium text-gray-600 mb-2">
                          Телефон
                        </span>
                        <span className="text-lg text-gray-800">{user.phone}</span>
                      </div>
                      <div className="border-2 border-gray-100 p-6 rounded-2xl">
                        <span className="block text-sm font-medium text-gray-600 mb-2">
                          Email
                        </span>
                        <span className="text-lg text-gray-800">{user.email}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'appeals' && <AppealsSection />}
          </div>
        </div>
      </div>
    </div>
  );
};
