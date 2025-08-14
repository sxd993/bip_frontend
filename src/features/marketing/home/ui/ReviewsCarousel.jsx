import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './styles/ReviewsCarousel.css'

const reviews = [
  { text: "Отличный продукт, рекомендую всем!", author: "Иван" },
  { text: "Супер сервис, все быстро и качественно.", author: "Мария" },
  { text: "Просто вау, я в восторге!", author: "Алексей" },
  { text: "Немного дорого, но стоит того.", author: "Ольга" },
  { text: "Лучшее, что я пробовал!", author: "Дмитрий" },
]

const ReviewsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="embla">
      <h1>Отзывы наших клиентов</h1>
      
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {reviews.map((review, index) => (
            <div className="embla__slide" key={index}>
              <div className="review">
                <p>{review.text}</p>
                <cite>- {review.author}</cite>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="embla__prev" onClick={scrollPrev}>
        ‹
      </button>
      <button className="embla__next" onClick={scrollNext}>
        ›
      </button>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewsCarousel