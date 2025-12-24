import { SERVICES } from '../../const/services';
import { ServicesCard } from './ServicesCard';

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
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {SERVICES.map((s) => (
                        <ServicesCard
                            key={s.id}
                            img={s.img}
                            title={s.title}
                            description={s.description}
                            isRed={s.isRed}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}