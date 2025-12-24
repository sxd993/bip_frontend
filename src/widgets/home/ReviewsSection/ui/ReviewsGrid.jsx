import { REVIEWS } from "@/entities/marketing/review/model/reviews"
import { ReviewCard } from "@/entities/marketing/review/ui/ReviewCard"

export const ReviwsGrid = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 content-between gap-2 h-full w-full ">
            {REVIEWS.slice(0,6).map((review) => (
                <ReviewCard key={review.id} text={review.text} image={review.image} />
            ))}
        </div>
    )
}
