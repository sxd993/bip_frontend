import { Button } from "@/shared/ui/Button"

export const ServicesCard = ({
    img,
    title,
    description,
    isRed
}) => {
    return (
        <div className="min-w-[160px] border-2 p-2 rounded-sm">
            <div className="flex flex-col">
                <div>
                    {/* Изображение */}
                    <div className="rounded-sm">
                        <img 
                        src={img} 
                        alt={title}
                        className="w-full" />
                    </div>
                    {/* Заголовок */}
                    <div className={`text-left text-wrap flex justify-baseline ${isRed && 'text-primary'}`}>
                        <span className="text-black font-medium text-xl">{title}</span>
                    </div>
                    {/* Описание */}
                    <div className={`text-left font-light text-[#1d293d] text-[9px] ${isRed && 'text-primary'}`}>
                        <p>{description}</p>
                    </div>
                </div>
                <Button
                    className={`bg-black text-white ${isRed && 'bg-primary'}`}
                    label={'Решить проблему'} />
            </div>
        </div>
    )
}