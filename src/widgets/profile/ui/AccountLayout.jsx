export const AccountLayout = ({ title, subtitle, sidebar, children }) => (
  <section className="py-6 sm:py-8 lg:py-10">
    <header className="mb-5 text-center sm:mb-6 lg:mb-8 lg:text-left">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
        Личный кабинет
      </p>
      <h1 className="text-xl font-bold tracking-tight text-text sm:text-2xl md:text-2xl lg:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base lg:text-lg">
          {subtitle}
        </p>
      )}
    </header>

    <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_19rem]">
      <main className="min-w-0 rounded-xl border border-border bg-surface p-4 sm:p-5 lg:p-6">
        {children}
      </main>

      <aside className="lg:sticky lg:top-24">{sidebar}</aside>
    </div>
  </section>
);
