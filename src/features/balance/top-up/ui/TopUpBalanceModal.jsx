import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { FormLabel } from '@/shared/ui/FormLabel';
import { useTopUpBalanceModal } from '../model/hooks/useTopUpBalanceModal';

export const TopUpBalanceModal = ({ isOpen, onClose }) => {
  const {
    amount,
    isPending,
    canSubmit,
    amountError,
    apiError,
    hint,
    handleClose,
    handleAmountChange,
    handleSubmit,
  } = useTopUpBalanceModal({ onClose });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Пополнение баланса"
      size="md"
      closeOnEscape={!isPending}
    >
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        noValidate
      >
        <Modal.Body className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Field error={amountError}>
              <FormLabel required>Сумма, ₽</FormLabel>
              <Input
                id="topup-amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                enterKeyHint="done"
                placeholder="Например, 5000"
                value={amount}
                onChange={handleAmountChange}
                disabled={isPending}
                required
                hasError={Boolean(amountError)}
                className="text-base"
                aria-describedby="topup-amount-hint"
              />
            </Field>
            <p
              id="topup-amount-hint"
              className="text-xs leading-relaxed text-text-muted sm:text-sm"
            >
              {hint}
            </p>
          </div>

          {apiError && (
            <p className="text-center text-sm text-error">{apiError}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isPending || !canSubmit}
            className="flex-1"
          >
            {isPending ? 'Переходим к оплате...' : 'Перейти к оплате'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
