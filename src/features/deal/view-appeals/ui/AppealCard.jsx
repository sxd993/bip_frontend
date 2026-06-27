import { useState } from "react";
import { ReplyModal } from "../../reply-to-appeal/ui/ReplyModal";
import { Button } from "@/shared/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { getAppealProgress } from "../lib/appealProgress";
import { AppealProgressBar } from "./AppealProgressBar";

const AppealCard = ({ appeal }) => {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const statusText = appeal?.info?.status?.trim() || "";
  const hasStatus =
    statusText !== "" && statusText.toLowerCase() !== "не указан";
  const hasOpportunity = appeal.opportunity && Number(appeal.opportunity) > 0;
  const progress = getAppealProgress(appeal);

  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-primary sm:text-xs">
            Обращение #{appeal.id}
            {appeal.author_name ? ` (${appeal.author_name})` : ""}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-text sm:text-base md:text-lg">
            {appeal.title}
          </h3>
          <p className="text-xs text-text-muted sm:text-sm">
            Создано {formatDate(appeal.created_at)}
          </p>
        </div>

        {hasStatus || appeal.is_closed ? (
          <span className="shrink-0 self-start rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text sm:text-sm">
            {appeal.is_closed ? "Завершено" : statusText}
          </span>
        ) : null}
      </div>

      {progress && (
        <AppealProgressBar
          percent={progress.percent}
          timeline={progress.timeline}
          isCompleted={appeal.is_closed}
        />
      )}

      {hasOpportunity && (
        <dl className="mt-4 space-y-2">
          <dt className="text-xs font-medium text-text-muted">Сумма сделки</dt>
          <dd className="text-sm font-semibold text-primary">
            {Number(appeal.opportunity).toLocaleString("ru-RU")} ₽
          </dd>
        </dl>
      )}

      {appeal.can_reply && (
        <div className="mt-4 border-t border-border pt-4">
          <Button
            onClick={() => setIsReplyModalOpen(true)}
            fullWidth
            className="animate-button-blink"
          >
            Ответить
          </Button>
        </div>
      )}

      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        appealId={appeal.id}
      />
    </article>
  );
};

export default AppealCard;
