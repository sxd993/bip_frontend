import { Link } from 'react-router-dom';
import bauken from '../../assets/AlexBauken.svg';
import './styles/MainSection.css';

import ProgressCircleExample from './ProgressCircleExample';

const MainSection = () => {
    const servicesLegal = [
        { name: 'Текст' },
        { name: 'Текст' },
        { name: 'Текст' },
    ];

    const servicesPrivate = [
        { name: 'Текст' },
        { name: 'Текст' },
        { name: 'Текст' },
    ];

    return (
        <div className='main-section-container'>

            {/* Welcome Section */}
            <div className="welcome-section-container">
                <div className='welcome-words'>
                    <div className='text'>
                        <h1 className='text-4xl font-bold'>Слоган</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cupiditate dignissimos expedita, sequi laudantium quo explicabo magni sapiente assumenda officiis hic ratione ipsa, blanditiis aliquam dolor excepturi laborum eum eligendi?</p>
                    </div>
                </div>
                <div className='bauken-container'>
                        <img src={bauken} alt="logo" />
                    </div>
            </div>


            {/* Services Overview */}
            <div className="services-overview">
                <div className="services-container">
                    <div className="service-header">
                        <div className="service-section">
                            <Link to="/ServicesBusiness" className="service-button">ЮРИДИЧЕСКИМ ЛИЦАМ</Link>
                            <div className="service-examples">
                                {servicesLegal.map((service, index) => (
                                    <div key={index} className="service-example">
                                        {service.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="service-section">
                            <Link to="/ServicesPrivate" className="service-button">ЧАСТНЫМ ЛИЦАМ</Link>
                            <div className="service-examples">
                                {servicesPrivate.map((service, index) => (
                                    <div key={index} className="service-example">
                                        {service.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="analytics-section">
                        <h2>Аналитические материалы</h2>
                        <div className="analytics-container">
                            <div className="analytics-item">
                                <p>Суд и таможня: усиление контроля за качеством вводимой продукции</p>
                                <div className="button-container">
                                    <Link to="/analytics" className="analytics-button-left"><span>→</span></Link>
                                </div>
                            </div>
                            <div className="analytics-content">
                                <ProgressCircleExample />
                                <div className="analytics-stats">
                                    <Link to="/analytics" className="analytics-button">Узнать подробнее</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSection;