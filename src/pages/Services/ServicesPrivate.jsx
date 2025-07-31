import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/ServicesPrivate.css';
import Progress from './Progress';

const ServicesPrivate = () => {
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
    <section className="private-services-section">
      <div>
        <h1>{serviceData.physical.title}</h1>
        <div className='section-right'>
          <div className="private-services-menu">
            <div className="private-services-menu-list">
              {serviceData.physical.services
                .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                .map((service) => (
                  <button
                    key={service.id}
                    className={`private-menu-button ${selectedService?.id === service.id ? 'active' : ''}`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <span className="number">{service.position}</span>
                    <span className="text">{service.name}</span>
                    <span className="arrow">▶</span>
                  </button>
                ))}
            </div>
          </div>
          <div className={`private-services-panel ${isPanelOpen ? 'open' : ''}`}>
            {isPanelOpen && selectedService ? (
              <>
                {selectedService.subServices.map((subService) => (
                  <div key={subService.id} className="private-panel-item">
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
      <Progress />
    </section>
  );
};

export default ServicesPrivate;