import { AiChat } from "@/widgets/ai-chat";
import { WELCOME_MARKETING } from "../model/const/highlights";

export const WelcomeSection = () => (
  <section>
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-12">
      <aside className="relative flex flex-col justify-center overflow-hidden lg:min-h-[560px]">
        <div className="relative z-10 max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary/65">
            КР17 · Конституция РФ · ст. 17
          </p>
          <h1 className="mt-4 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-text sm:text-3xl">
            Права неотчуждаемы.
            <span className="mt-1.5 block font-semibold text-primary">
              Интересы — под защитой.
            </span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-[0.9375rem]">
            Статья 17 открывает главу о правах человека. КР17 помогает
            опереться на неё в вашей ситуации.
          </p>

          <ol className="mt-8 space-y-0 divide-y divide-border border-y border-border">
            {WELCOME_MARKETING.map((item, index) => (
              <li
                key={item.label}
                className="grid grid-cols-[2rem_1fr] gap-3 py-4 sm:gap-4"
              >
                <span className="pt-0.5 text-sm font-bold tabular-nums text-primary/45">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-text sm:text-base">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="relative h-[min(560px,80vh)] lg:h-auto">
        <div className="h-full lg:absolute lg:inset-0">
          <AiChat />
        </div>
      </div>
    </div>
  </section>
);
