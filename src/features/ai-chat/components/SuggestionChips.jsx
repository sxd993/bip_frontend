const SUGGESTIONS = [
  'Трудовой спор с работодателем',
  'Семейное право / развод',
  'Вопрос по недвижимости',
  'Защита прав потребителей',
];

export const SuggestionChips = ({ onSelect }) => (
  <div className="flex flex-wrap gap-2 px-4 pb-3">
    {SUGGESTIONS.map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onSelect(s)}
        className="rounded-full border border-primary/40 bg-primary/8 px-3 py-1 text-xs text-primary transition-colors hover:bg-primary/15 active:scale-95"
      >
        {s}
      </button>
    ))}
  </div>
);
