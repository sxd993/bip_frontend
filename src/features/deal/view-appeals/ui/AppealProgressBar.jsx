export const AppealProgressBar = ({ percent, timeline, isCompleted = false }) => (
  <div className="mt-4">
    <div className="mb-2 flex items-center justify-between gap-3 text-xs">
      <span className="font-medium text-text-muted">
        {isCompleted ? "Обращение завершено" : "Прогресс"}
      </span>
      <span className="font-semibold text-text">{percent}%</span>
    </div>

    <div
      className="h-2 overflow-hidden rounded-full bg-surface-muted"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="Прогресс обращения"
    >
      <div
        className={[
          "h-full rounded-full transition-all duration-300",
          isCompleted ? "bg-success" : "bg-primary",
        ].join(" ")}
        style={{ width: `${percent}%` }}
      />
    </div>

    {timeline && (
      <p className="mt-2 text-xs text-text-muted">Срок: {timeline}</p>
    )}
  </div>
);
