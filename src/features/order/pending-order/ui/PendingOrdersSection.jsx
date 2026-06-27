import { Loading } from '@/shared/ui/Loading';
import { useUser } from '@/entities/auth';
import { usePendingOrder } from '../model/usePendingOrder';
import { PendingOrderCard } from './PendingOrderCard';

export const PendingOrdersSection = () => {
  const { user } = useUser();
  const { order, isLoading, error, payOrder, isPaying, payError } = usePendingOrder();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center lg:text-left">
        <h2 className="text-lg font-semibold text-text sm:text-xl lg:text-xl">
          Неоплаченные заявки
        </h2>
        <p className="mt-1 text-sm text-text-muted sm:text-base lg:text-sm">
          {order
            ? 'Оплатите заявку, чтобы мы начали работу над вашим обращением'
            : 'Здесь появятся заявки после консультации с интеллектуальным помощником'}
        </p>
      </div>

      {order ? (
        <PendingOrderCard
          order={order}
          balance={user?.balance ?? 0}
          onPay={payOrder}
          isPaying={isPaying}
          payError={payError}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-background px-6 py-14 text-center">
          <div className="mx-auto mb-5 h-14 w-14 text-text-muted">
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-base font-medium text-text sm:text-lg lg:text-lg">
            Нет неоплаченных заявок
          </h3>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-text-muted sm:text-base lg:text-sm">
            Опишите ситуацию интеллектуальному помощнику на главной странице — он
            подготовит заявку с суммой и сроками
          </p>
        </div>
      )}
    </div>
  );
};
