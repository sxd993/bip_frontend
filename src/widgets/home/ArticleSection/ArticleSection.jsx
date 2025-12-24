import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Решения для частных клиентов",
  },
  {
    id: 2,
    title: "Сертификаты и экспертизы",
  },
  {
    id: 3,
    title: "Кейсы для бизнеса",
  },
];

export const ArticleSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-[#A01E1E] text-[32px] font-bold mb-6">Статьи</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="relative h-[180px] rounded-[18px] bg-[#A01E1E] flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#A01E1E] via-[#8B1212] to-[#620B0B]"></div>
              <div className="relative text-center text-white px-4">
                <p className="text-lg font-semibold tracking-wider uppercase">{article.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-start">
          <Link
            to="/press-center"
            className="bg-[#A01E1E] text-white text-[18px] font-bold px-8 py-3 rounded-[10px] shadow-lg transition hover:bg-[#7f1616]"
          >
            смотреть все
          </Link>
        </div>
      </div>
    </section>
  );
};
