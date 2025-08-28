import { useState } from 'react';

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

  const handleServiceClick = (service) => {
    if (selectedService?.id === service.id) {
      setSelectedService(null);
      setIsPanelOpen(false);
    } else {
      setSelectedService(service);
      setIsPanelOpen(true);
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">{serviceData.legal.title}</h1>
          <p className="text-lg md:text-xl text-gray-600">Профессиональные юридические услуги для вашего бизнеса</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Services Menu */}
          <div>
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-red-200 transition-colors duration-300">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8">Выберите категорию услуг</h2>
              <div className="space-y-4">
                {serviceData.legal.services
                  .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                  .map((service) => (
                    <button
                      key={service.id}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                        selectedService?.id === service.id
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-100 hover:border-red-200'
                      }`}
                      onClick={() => handleServiceClick(service)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="w-10 h-10 bg-red-400 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {service.position}
                          </span>
                          <span className="font-medium text-gray-800 text-lg">{service.name}</span>
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
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 h-full hover:border-red-200 transition-colors duration-300">
              {isPanelOpen && selectedService ? (
                <div className="space-y-8">
                  <div className="border-b-2 border-gray-100 pb-6">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{selectedService.name}</h3>
                    <p className="text-gray-600 text-lg">Подробная информация об услугах в данной категории</p>
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
                    <button className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200">
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