import { Link } from "react-router-dom";
import { AiChat } from "@/widgets/ai-chat";
import { WELCOME_HIGHLIGHTS } from "../model/const/highlights";

export const WelcomeSection = () => (
  <section className="pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
    <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
      <div className="text-center lg:text-left">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary sm:mb-4 sm:text-base md:text-lg lg:text-xl">
          Баукен и Партнеры
        </p>

        <h1 className="text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl md:text-4xl lg:text-5xl lg:leading-snug">
          Сложная ситуация? <br className="sm:hidden lg:block" />
          <span className="text-primary">Мы уже на связи.</span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-muted sm:mt-5 sm:text-lg lg:mt-5 lg:text-xl">
          Интеллектуальный помощник выслушает, задаст уточняющие вопросы и
          подскажет первый шаг — бесплатно и без ожидания в очереди.
        </p>
      </div>

      <AiChat />
    </div>

    <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:gap-6">
      {WELCOME_HIGHLIGHTS.map((item) => (
        <li key={item.title}>
          <Link
            to={item.to}
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary sm:p-5"
          >
            <h2 className="text-base font-semibold text-text transition-colors group-hover:text-primary sm:text-lg lg:text-xl">
              {item.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted lg:text-base">
              {item.description}
            </p>
            <span className="mt-3 text-sm font-medium text-primary sm:mt-4">
              {item.cta} →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);
