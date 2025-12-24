import { SERVICES } from '../../const/services';
import { ServicesCard } from './ServicesCard';
import { Link } from 'react-router-dom';

export const ServicesSection = () => {
    return (
        <div className='my-10'>
            <div className="max-w-6xl px-[2%] lg:px-0 flex flex-col gap-10 mx-auto">
                {/* Заголовок секции */}
                <span>
                    <p className="text-primary text-5xl">
                        Услуги
                    </p>
                </span>
                {/* Сетка услуг */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {SERVICES.map((s) => (
                        <ServicesCard
                            key={s.id}
                            img={s.img}
                            title={s.title}
                            description={s.description}
                            isRed={s.isRed}
                        />
                    ))}
                    {/* Призыв к действию */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 flex items-center justify-center my-4">
                        <Link 
                            to="/auth" 
                            className="flex items-center gap-3 text-primary text-3xl md:text-3xl lg:text-3xl font-medium hover:opacity-80 transition-opacity text-center"
                        >
                            <span>Зарегистрироваться и заказать услугу</span>
                            <svg 
                                width="28" 
                                height="28" 
                                viewBox="0 0 20 20" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block flex-shrink-0"
                            >
                                <path 
                                    d="M7.5 15L12.5 10L7.5 5" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}