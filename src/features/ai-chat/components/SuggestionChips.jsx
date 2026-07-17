export const SuggestionChips = ({ items = [], onSelect, disabled = false }) => {
  if (!items.length) return null;

  return (
    <div className="flex shrink-0 flex-wrap justify-center gap-2 border-t border-border bg-surface px-4 py-3">
      {items.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(s)}
          className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-text transition-colors hover:border-primary hover:text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {s}
        </button>
      ))}
    </div>
  );
};
