import { useState } from 'react';
import './styles/ServicesBusiness.css';

const ServicesBusiness = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleServiceClick = (service) => {
    if (selectedService?.id === service.id && isPanelOpen) {
      setSelectedService(null);
      setIsPanelOpen(false);
    } else {
      setSelectedService(service);
      setIsPanelOpen(true);
    }
  };

  return (
    <section className="business-services-section">
      <div>
        <h1>{serviceData.legal.title}</h1>
        <div className="section-right">
          <div className="business-services-menu">
            <div className="business-services-menu-list">
              {serviceData.legal.services
                .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                .map((service) => (
                  <button
                    key={service.id}
                    className={`business-menu-button ${selectedService?.id === service.id ? 'active' : ''}`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <span className="number">{service.position}</span>
                    <span className="text">{service.name}</span>
                    <span className="arrow">▶</span>
                  </button>
                ))}
            </div>
          </div>
          <div className={`business-services-panel ${isPanelOpen ? 'open' : ''}`}>
            {isPanelOpen && selectedService ? (
              <>
                {selectedService.subServices.map((subService) => (
                  <div key={subService.id} className="business-panel-item">
                    <span>{subService.name}</span>
                    <p>{subService.description}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>Нажмите на категорию для деталей</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesBusiness;