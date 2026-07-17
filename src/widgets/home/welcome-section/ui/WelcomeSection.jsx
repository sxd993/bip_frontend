import { Link } from "react-router-dom";
import { AiChat } from "@/widgets/ai-chat";
import { WELCOME_HIGHLIGHTS } from "../model/const/highlights";

export const WelcomeSection = () => (
  <section>
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
      <div className="relative h-[min(440px,70vh)] lg:h-auto">
        <div className="h-full lg:absolute lg:inset-0">
          <AiChat />
        </div>
      </div>

      <ul className="flex flex-col gap-4 sm:gap-5">
        {WELCOME_HIGHLIGHTS.map((item) => (
          <li key={item.title}>
            <Link
              to={item.to}
              className="group flex flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary sm:p-5 lg:p-6"
            >
              <h2 className="text-base font-semibold text-text transition-colors group-hover:text-primary sm:text-lg lg:text-xl">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted lg:text-base">
                {item.description}
              </p>
              <span className="mt-3 text-sm font-medium text-primary sm:mt-4">
                {item.cta} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
