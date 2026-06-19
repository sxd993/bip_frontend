import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Loading } from "@/shared/ui/Loading";
import { Button } from "@/shared/ui/Button";

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const ModalRoot = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  closeOnEscape = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    if (!closeOnEscape) {
      return () => {
        document.body.style.overflow = "unset";
      };
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={[
          "flex w-full max-h-[90vh] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
          SIZE_CLASSES[size],
        ].join(" ")}
      >
        {title && (
          <div className="shrink-0 border-b border-border px-5 py-4 sm:px-6">
            <h2
              id="modal-title"
              className="text-lg font-bold text-text sm:text-xl"
            >
              {title}
            </h2>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto text-text">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ModalBody = ({ children, className = "" }) => (
  <div className={["px-5 py-5 sm:px-6", className].filter(Boolean).join(" ")}>
    {children}
  </div>
);

const ModalFooter = ({ children }) => (
  <div className="flex shrink-0 flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:px-6">
    {children}
  </div>
);

const MESSAGE_STYLES = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-green-200 bg-green-50 text-green-700",
  info: "border-border bg-background text-text-muted",
};

const ModalMessage = ({ type = "error", children }) => (
  <div
    className={[
      "rounded-xl border px-4 py-3 text-sm",
      MESSAGE_STYLES[type],
    ].join(" ")}
  >
    {children}
  </div>
);

const ModalState = ({ variant, text, onConfirm, confirmLabel = "Хорошо" }) => {
  if (variant === "loading") {
    return (
      <ModalBody>
        <Loading size="medium" text={text || 'Загрузка'} />
      </ModalBody>
    );
  }

  if (variant === "success") {
    return (
      <>
        <ModalBody className="py-10 text-center">
          <p className="text-xl font-semibold text-text sm:text-2xl">{text}</p>
        </ModalBody>
        {onConfirm && (
          <ModalFooter>
            <Button type="button" onClick={onConfirm} fullWidth>
              {confirmLabel}
            </Button>
          </ModalFooter>
        )}
      </>
    );
  }

  if (variant === "error") {
    return (
      <ModalBody className="py-10 text-center">
        <p className="text-sm text-error">{text}</p>
      </ModalBody>
    );
  }

  return null;
};

export const Modal = Object.assign(ModalRoot, {
  Body: ModalBody,
  Footer: ModalFooter,
  Message: ModalMessage,
  State: ModalState,
});
