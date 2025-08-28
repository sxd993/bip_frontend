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
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{serviceData.legal.title}</h1>
          <p className="text-lg text-gray-600">Профессиональные юридические услуги для вашего бизнеса</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Services Menu */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Выберите категорию услуг</h2>
              <div className="space-y-3">
                {serviceData.legal.services
                  .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                  .map((service) => (
                    <button
                      key={service.id}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedService?.id === service.id
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                      onClick={() => handleServiceClick(service)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {service.position}
                          </span>
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </div>
                        <span className={`text-red-600 transition-transform duration-200 ${
                          selectedService?.id === service.id ? 'rotate-90' : ''
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
              {isPanelOpen && selectedService ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{selectedService.name}</h3>
                    <p className="text-gray-600">Подробная информация об услугах в данной категории</p>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedService.subServices.map((subService) => (
                      <div key={subService.id} className="border-l-4 border-red-600 pl-4 py-3">
                        <h4 className="font-semibold text-gray-900 mb-2">{subService.name}</h4>
                        <p className="text-gray-600 leading-relaxed">{subService.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                      Получить консультацию
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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