import { useState } from "react";
import { Modal } from "@/shared/ui/Modal";
import { Field } from "@/shared/ui/Field";
import { FormLabel } from "@/shared/ui/FormLabel";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useInviteEmployee } from "../model/useInviteEmployee";

export const InviteEmployeeModal = ({ isOpen, onClose }) => {
  const { form, states, actions, errorMessage, inviteLink } =
    useInviteEmployee(isOpen);
  const { isSuccess, isSubmitting, isError, error } = states;
  const { resetAll } = actions;
  const [isCopied, setIsCopied] = useState(false);

  const handleClose = () => {
    resetAll();
    setIsCopied(false);
    onClose();
  };

  const handleCopy = async () => {
    if (!inviteLink) return;

    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  if (isSuccess && inviteLink) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Приглашение сотрудника">
        <Modal.Body className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-text-muted">
            Отправьте ссылку сотруднику — по ней он сможет зарегистрироваться в
            личном кабинете компании.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              readOnly
              value={inviteLink}
              className="text-sm sm:flex-1"
            />
            <Button
              type="button"
              onClick={handleCopy}
              className="shrink-0 sm:w-auto"
            >
              {isCopied ? "Скопировано" : "Скопировать"}
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={handleClose} fullWidth>
            Хорошо
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Приглашение сотрудника"
      size="md"
    >
      <form onSubmit={form.handleSubmit} noValidate>
        <Modal.Body className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-text-muted">
            Укажите email сотрудника — мы создадим персональную ссылку для
            регистрации.
          </p>

          {(isError || error) && (
            <Modal.Message type="error">{errorMessage}</Modal.Message>
          )}

          <Field error={form.errors.email?.message}>
            <FormLabel required>Email</FormLabel>
            <Input
              type="email"
              placeholder="employee@company.ru"
              hasError={Boolean(form.errors.email)}
              autoComplete="email"
              {...form.register()}
            />
          </Field>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={!form.isValid || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Создание..." : "Создать ссылку"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
