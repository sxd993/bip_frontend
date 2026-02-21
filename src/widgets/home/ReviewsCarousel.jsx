import { useCallback, memo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const reviews = [
  { text: "Профессиональный подход и высокое качество услуг. Рекомендую всем, кто ценит надежность и результат.", author: "Иван Петров", company: "ООО 'СтройИнвест'" },
  { text: "Быстрое решение сложных юридических вопросов. Команда работает слаженно и профессионально.", author: "Мария Сидорова", company: "ИП 'Торговый дом'" },
  { text: "Отличный сервис и индивидуальный подход к каждому клиенту. Результат превзошел ожидания.", author: "Алексей Козлов", company: "ООО 'ТехноСервис'" },
  { text: "Высокий уровень экспертизы и внимательное отношение к деталям. Надежный партнер в бизнесе.", author: "Ольга Морозова", company: "ООО 'МедиаГрупп'" },
  { text: "Профессионализм и ответственность на высшем уровне. Спасибо за качественную работу!", author: "Дмитрий Волков", company: "ИП 'КонсалтингПро'" },
]

const ReviewsSlide = memo(function ReviewsSlide({ review, index }) {
  return (
    <div className="flex-[0_0_100%] min-w-0" key={index}>
      <div className="mx-4">
        <div className="bg-white border-2 border-red-200 p-8 md:p-12 text-center flex flex-col justify-center rounded-3xl min-h-[350px]">
          <div className="mb-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic font-light">"{review.text}"</p>
          </div>
          <div className="border-t-2 border-gray-100 pt-6 mt-auto">
            <div className="font-semibold text-gray-800 text-lg md:text-xl">{review.author}</div>
            <div className="text-gray-600 text-base md:text-lg mt-2">{review.company}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

const ReviewsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    draggable: false,
    containScroll: 'trimSnaps',
    skipSnaps: true,
    duration: 20
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const preventInteraction = useCallback((event) => {
    // Предотвращаем нативный скролл/свайпы
    event.preventDefault()
    event.stopPropagation()
  }, [])


  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Отзывы наших клиентов</h2>
          <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600">Доверие клиентов - наша главная ценность</p>
        </div>
        
        <div className="relative">
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10" 
            onClick={scrollPrev}
            aria-label="Предыдущий отзыв"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            className="overflow-hidden" 
            ref={emblaRef}
            onTouchStart={preventInteraction}
            onTouchMove={preventInteraction}
            onPointerDown={preventInteraction}
            onWheel={preventInteraction}
          >
            <div className="flex will-change-transform transform-gpu">
              {reviews.map((review, index) => (
                <ReviewsSlide review={review} index={index} key={index} />
              ))}
            </div>
          </div>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10" 
            onClick={scrollNext}
            aria-label="Следующий отзыв"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Индикаторы отключены: управление только стрелками */}
      </div>
    </div>
  )
}

export default ReviewsCarousel