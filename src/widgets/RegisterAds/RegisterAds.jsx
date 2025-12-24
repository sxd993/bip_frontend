import { ArrowRightCircleIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export const RegisterAds = () => {
    return (
        <Link 
        to={'/auth/register'}
        className="flex gap-5 justify-center items-center max-w-6xl col-span-2 cursor-pointer">
            <div className="text-primary font-bold text-3xl flex items-start justify-center text-center">Зарегистрироваться <br /> и заказать услугу</div>
            <ArrowRightCircleIcon height={48} width={48} className="text-primary"/>
        </Link>
    )
}
