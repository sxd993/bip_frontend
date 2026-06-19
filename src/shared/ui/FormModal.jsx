import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';

export const FormModal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  onSubmit,
  children,
  submitLabel = 'Сохранить',
  cancelLabel = 'Отмена',
  isPending = false,
  error = null,
  submitDisabled = false,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
    <form onSubmit={onSubmit}>
      <Modal.Body className="flex flex-col gap-4">
        {error && <Modal.Message type="error">{error}</Modal.Message>}
        {children}
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          {cancelLabel}
        </Button>
        <Button type="submit" disabled={isPending || submitDisabled} className="flex-1">
          {isPending ? 'Сохранение...' : submitLabel}
        </Button>
      </Modal.Footer>
    </form>
  </Modal>
);
