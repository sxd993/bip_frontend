import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const serviceData = {
  legal: {
    title: 'Услуги для юридических лиц',
    services: [
      {
        id: 1,
        position: 1,
        name: 'Корпоративное право',
        subServices: [
          { id: 1, name: 'Регистрация ООО', description: 'Полный комплекс услуг по регистрации общества с ограниченной ответственностью' },
          { id: 2, name: 'Изменения в ЕГРЮЛ', description: 'Внесение изменений в единый государственный реестр юридических лиц' },
          { id: 3, name: 'Ликвидация компаний', description: 'Добровольная и принудительная ликвидация юридических лиц' }
        ]
      },
      {
        id: 2,
        position: 2,
        name: 'Налоговое право',
        subServices: [
          { id: 4, name: 'Налоговое планирование', description: 'Оптимизация налогообложения и налоговое планирование' },
          { id: 5, name: 'Споры с налоговыми органами', description: 'Представление интересов в налоговых спорах' }
        ]
      },
      {
        id: 3,
        position: 3,
        name: 'Трудовое право',
        subServices: [
          { id: 6, name: 'Трудовые договоры', description: 'Составление и проверка трудовых договоров' },
          { id: 7, name: 'Трудовые споры', description: 'Разрешение трудовых споров и конфликтов' }
        ]
      }
    ]
  }
};

const ServicesBusiness = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    if (selectedService?.id === service.id) {
      setSelectedService(null);
      setIsPanelOpen(false);
    } else {
      setSelectedService(service);
      setIsPanelOpen(true);
    }
  };

  const handleConsultationClick = () => {
    navigate('/personal-account');
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{serviceData.legal.title}</h1>
          <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">Профессиональные юридические услуги для вашего бизнеса</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Services Menu */}
          <div>
            <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Выберите услугу</h2>
                </div>
              </div>
              <div className="space-y-5">
                {serviceData.legal.services
                  .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                  .map((service) => (
                    <button
                      key={service.id}
                      className={`w-full text-left p-4 border-2 rounded-2xl transition-all duration-300 group ${
                        selectedService?.id === service.id
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                      onClick={() => handleServiceClick(service)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            selectedService?.id === service.id
                              ? 'bg-red-500'
                              : 'bg-red-400 group-hover:bg-red-500'
                          }`}></div>
                          <span className="text-gray-800 font-semibold text-base md:text-lg tracking-wide">{service.name}</span>
                        </div>
                        <span className={`text-red-400 transition-transform duration-200 ${
                          selectedService?.id === service.id ? 'rotate-90' : ''
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Service Details Panel */}
          <div className={`transition-all duration-300 ${
            isPanelOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12 h-full">
              {isPanelOpen && selectedService ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{selectedService.name}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {selectedService.subServices.map((subService) => (
                      <div key={subService.id} className="border-l-4 border-red-400 pl-6 py-4">
                        <h4 className="font-semibold text-gray-800 mb-3 text-lg">{subService.name}</h4>
                        <p className="text-gray-600 leading-relaxed text-base">{subService.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6">
                    <button 
                      onClick={handleConsultationClick}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-3xl transition-colors duration-300"
                    >
                      Получить консультацию
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">Выберите категорию услуг для просмотра деталей</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesBusiness;