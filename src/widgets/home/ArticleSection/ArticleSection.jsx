const faqs = [
  "Для чего нужен личный кабинет?",
  "Обязателен ли личный кабинет?",
  "Как я могу удостовериться в вашей добросовестности?",
  "Возможно ли договориться об услуге по телефону?",
  "Хочу встретиться лично, это возможно?",
  "Как узнать стоимость услуги?",
];

const ArrowIcon = () => (
  <svg
    width={17}
    height={14}
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#A01E1E]"
  >
    <path
      d="M6.66036 13.8852L0 0H4.06395L8.35368 9.21915L12.681 0H16.745L10.0846 13.8852H6.66036Z"
      fill="#A01E1E"
    />
  </svg>
);

export const ArticleSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-[#A01E1E] text-[32px] font-bold mb-6">Частые вопросы</h2>

        <div className="flex flex-col gap-4">
          {faqs.map((question) => (
            <button
              type="button"
              key={question}
              className="flex justify-between items-start w-full rounded-[10px] px-4 py-3 text-left text-[#A01E1E] text-[20px] font-semibold border border-transparent hover:border-[#A01E1E] transition"
            >
              <span className="leading-[1.4]">{question}</span>
              <div className="shrink-0 self-center">
                <ArrowIcon />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
