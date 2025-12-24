import { BigReview } from "./BigReview"
import { ReviwsGrid } from "./ReviewsGrid"


export const ReviewsSection = () => {
    return (
        <div className="flex flex-col gap-10 max-w-6xl px-[2%] lg:px-0 mx-auto">
            {/* Заголовок секции */}
            <p className="text-primary text-3xl font-medium">
                Отзывы о нас
            </p>
            {/* Отзывы */}
            <div className="flex w-full justify gap-5">
                <div className="basis-4/6 md:basis-1/3 ">
                    <BigReview />
                </div>
                <div className="basis-3/6 md:basis-2/3">
                    <ReviwsGrid />
                </div>
            </div>
        </div>

    )
}
