const SUGGESTIONS = [
  "Трудовой спор с работодателем",
  "Семейное право / развод",
  "Вопрос по недвижимости",
  "Защита прав потребителей",
];

export const SuggestionChips = ({ onSelect }) => (
  <div className="flex shrink-0 flex-wrap gap-2 border-t border-border bg-surface px-4 py-3">
    {SUGGESTIONS.map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onSelect(s)}
        className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-text transition-colors hover:border-primary hover:text-primary active:scale-95"
      >
        {s}
      </button>
    ))}
  </div>
);
