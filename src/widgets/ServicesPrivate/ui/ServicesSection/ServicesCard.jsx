import { Button } from "@/shared/ui/Button"

export const ServicesCard = ({
    img,
    title,
    description,
    isRed
}) => {
    return (
        <div className="min-w-[160px] min-h-[300px] border-2 p-2 rounded-sm">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mb-5">
                        {/* Изображение */}
                        <div className="rounded-sm">
                            <img
                                src={img}
                                alt={title}
                                className="w-full" />
                        </div>
                        {/* Заголовок */}
                        <div className={`text-left text-wrap flex justify-baseline mt-2`}>
                            <span className={`${isRed ? 'text-primary' : 'text-black'} font-medium text-xl leading-[100%]`}>{title}</span>
                        </div>
                        {/* Описание */}
                        <div className={`text-left font-light text-[#1d293d] lg:text-base text-sm mt-2 ${isRed && 'text-primary'}`}>
                            {description}
                        </div>
                    </div>
                </div>
                {/* Кнопка */}
                <div className="flex justify-center items-end">
                    <Button
                        className={`${isRed ? 'bg-primary!' : 'bg-secondary!'} font-bold!  text-white! text-base! leading-[100%] py-3! px-4! flex-1!`}
                        label='решить проблему'
                    />

                </div>


            </div>
        </div>
    )
}