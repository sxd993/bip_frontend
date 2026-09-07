import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getPaymentStatusApi } from "@/entities/payments";
import {
  MAX_POLLS,
  PAYMENT_RETURN_ORDERS_PATH,
  POLL_INTERVAL_MS,
} from "../const/paymentReturn";

const clearPaymentIdFromUrl = (navigate, searchParams) => {
  const next = new URLSearchParams(searchParams);
  next.delete("paymentId");
  const search = next.toString();
  navigate(
    {
      pathname: PAYMENT_RETURN_ORDERS_PATH,
      search: search ? `?${search}` : "",
    },
    { replace: true },
  );
};

export function usePaymentReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const paymentId = Number(searchParams.get("paymentId"));
  const hasPaymentId = Number.isFinite(paymentId) && paymentId > 0;

  const [syncError, setSyncError] = useState(null);

  useEffect(() => {
    if (!hasPaymentId) {
      return undefined;
    }

    let cancelled = false;
    let attempts = 0;
    let timerId = null;

    const finishWithoutSuccess = (message) => {
      setSyncError(message);
      clearPaymentIdFromUrl(navigate, searchParams);
    };

    const check = async () => {
      attempts += 1;
      try {
        const result = await getPaymentStatusApi(paymentId);
        if (cancelled) return;

        if (result.status === "succeeded") {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["user"] }),
            queryClient.invalidateQueries({ queryKey: ["pendingOrder"] }),
          ]);
          if (cancelled) return;
          setSyncError(null);
          clearPaymentIdFromUrl(navigate, searchParams);
          return;
        }

        if (result.status === "canceled") {
          finishWithoutSuccess(
            "Платёж отменён. Вы можете попробовать пополнить баланс снова.",
          );
          return;
        }

        if (attempts >= MAX_POLLS) {
          finishWithoutSuccess(
            "Оплата ещё обрабатывается. Обновите страницу чуть позже.",
          );
          return;
        }

        timerId = setTimeout(check, POLL_INTERVAL_MS);
      } catch (err) {
        if (cancelled) return;
        if (attempts >= MAX_POLLS) {
          finishWithoutSuccess(
            err?.response?.data?.error ||
              err?.message ||
              "Не удалось проверить статус оплаты",
          );
          return;
        }
        timerId = setTimeout(check, POLL_INTERVAL_MS);
      }
    };

    check();

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [hasPaymentId, paymentId, queryClient, navigate, searchParams]);

  return { syncError };
}
