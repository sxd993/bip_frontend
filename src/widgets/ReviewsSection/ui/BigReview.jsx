import { REVIEWS } from "@/entities/marketing/review/model/reviews"
import { ReviewCard } from "@/entities/marketing/review/ui/ReviewCard"

export const BigReview = () => {
    return (
        <div className="h-full w-full">
            {REVIEWS.slice(0, 1).map((review) => (
                <ReviewCard key={review.id} text={review.text} image={review.image} />
            ))}
        </div>
    )
}
