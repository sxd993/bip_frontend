import { Button } from '@/shared/ui/Button';
import { formatDate } from '@/shared/utils/formatters';

export const PendingOrderCard = ({ order, onPay, isPaying, payError }) => {
  const payErrorMessage =
    payError?.response?.data?.error ||
    payError?.response?.data?.message ||
    payError?.message;

  return (
    <article className="flex flex-col rounded-xl border border-primary/30 bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-primary sm:text-xs">
            Заявка на оплату #{order.id}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-text sm:text-base md:text-lg">
            {order.title}
          </h3>
          {order.legal_area && (
            <p className="text-xs text-text-muted sm:text-sm">{order.legal_area}</p>
          )}
          <p className="text-xs text-text-muted sm:text-sm">
            Создана {formatDate(order.created_at)}
          </p>
        </div>

        <span className="shrink-0 self-start rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text sm:text-sm">
          Ожидает оплаты
        </span>
      </div>

      <dl className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
        {order.timeline && (
          <div>
            <dt className="text-xs font-medium text-text-muted">Сроки</dt>
            <dd className="mt-1 text-sm font-medium text-text">{order.timeline}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs font-medium text-text-muted">Сумма</dt>
          <dd className="mt-1 text-sm font-semibold text-primary">
            {Number(order.amount).toLocaleString('ru-RU')} ₽
          </dd>
        </div>
      </dl>

      {order.summary && (
        <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-text-muted">
          {order.summary}
        </p>
      )}

      {payErrorMessage && (
        <p className="mt-4 text-sm text-error">{payErrorMessage}</p>
      )}

      <div className="mt-4 border-t border-border pt-4">
        <Button
          onClick={() => onPay(order.id)}
          disabled={isPaying}
          fullWidth
        >
          {isPaying ? 'Оплата...' : 'Оплатить'}
        </Button>
      </div>
    </article>
  );
};
