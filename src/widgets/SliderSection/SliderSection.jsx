import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

export const SliderSection = () => {
    return (
        <div>
            <div className="max-w-6xl mt-20 px-[2%] lg:px-0 mx-auto flex justify-center md:justify-around items-center pt-5 gap-5">
                {/* Левая стрелка */}
                <div className="">
                    <ArrowLeftIcon className="h-10 w-10 text-primary" />

                </div>
                {/*  Изображения */}
                <div className="flex justify-between md:flex-1 py-2 gap-5 min-w-[220px] w-full">
                    <div className="flex-1 ">
                        <img
                            className="w-full h-full"
                            src="https://s3.twcstorage.ru/d90a9000-bip/ServicesPrivate/Rectangle%20536.png" alt="" />
                    </div>
                    <div className="hidden lg:block lg:flex-1">
                        <img
                            className="w-full h-full"
                            src="https://s3.twcstorage.ru/d90a9000-bip/ServicesPrivate/Rectangle%20536.png" alt="" />
                    </div>
                </div>
                {/* Правая стрелка */}
                <div>
                    <ArrowRightIcon className="h-10 w-10 text-primary" />
                </div>
            </div>
        </div>
    )
}