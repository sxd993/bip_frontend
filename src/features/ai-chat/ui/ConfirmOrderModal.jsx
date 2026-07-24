import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { FormLabel } from '@/shared/ui/FormLabel';
import FileUploadSection from '@/shared/components/FileUploadSection';
import { useConfirmOrderModal } from '../model/useConfirmOrderModal';

export const ConfirmOrderModal = ({
  isOpen,
  proposal,
  onClose,
  onConfirm,
  isSubmitting = false,
  error = null,
}) => {
  const {
    confirmations,
    title,
    summary,
    timeline,
    amountLabel,
    fullName,
    additionalDescription,
    additionalDescriptionMax,
    additionalDescriptionLeft,
    formError,
    isFactChecked,
    toggleFact,
    handleFullNameChange,
    handleAdditionalDescriptionChange,
    handleSubmit,
    fileUpload,
  } = useConfirmOrderModal({
    isOpen,
    proposal,
    onConfirm,
    isSubmitting,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? undefined : onClose}
      title="Договор на оказание услуг"
      size="xl"
      closeOnEscape={!isSubmitting}
    >
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <Modal.Body className="flex flex-col gap-4 py-4 sm:gap-5">
          {(error || formError) && (
            <Modal.Message type="error">{error || formError}</Modal.Message>
          )}

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <section className="space-y-4 rounded-xl border border-border bg-background p-4 sm:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Предмет договора
                </p>
                <h3 className="mt-2 text-lg font-semibold text-text">{title}</h3>
                {summary && (
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {summary}
                  </p>
                )}
              </div>

              <dl className="grid gap-3 border-t border-border pt-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-text-muted">
                    Стоимость
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-primary">
                    {amountLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-text-muted">Сроки</dt>
                  <dd className="mt-1 text-sm font-medium text-text">
                    {timeline}
                  </dd>
                </div>
              </dl>

              <div>
                <FormLabel required>ФИО</FormLabel>
                <Input
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Фамилия Имя Отчество"
                  disabled={isSubmitting}
                  hasError={Boolean(formError)}
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <FormLabel>Дополнительное описание</FormLabel>
                  <span className="text-xs text-text-muted">
                    {additionalDescriptionLeft}/{additionalDescriptionMax}
                  </span>
                </div>
                <Textarea
                  value={additionalDescription}
                  onChange={handleAdditionalDescriptionChange}
                  placeholder="Уточните детали, если нужно"
                  rows={3}
                  maxLength={additionalDescriptionMax}
                  disabled={isSubmitting}
                />
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-border bg-background p-4 sm:p-5">
              {confirmations.length > 0 && (
                <fieldset className="space-y-2.5">
                  <legend className="text-sm font-medium text-text">
                    Подтвердите информацию из консультации
                  </legend>
                  {confirmations.map((fact, index) => (
                    <label
                      key={`${index}-${fact}`}
                      className="flex cursor-pointer items-start gap-3"
                    >
                      <input
                        type="checkbox"
                        checked={isFactChecked(index)}
                        onChange={() => toggleFact(index)}
                        disabled={isSubmitting}
                        className="mt-0.5 size-4 shrink-0 rounded border-border text-primary accent-primary focus:ring-primary"
                      />
                      <span className="text-sm leading-relaxed text-text-muted">
                        {fact}
                      </span>
                    </label>
                  ))}
                </fieldset>
              )}

              <FileUploadSection
                attachedFiles={fileUpload.attachedFiles}
                fileErrors={fileUpload.fileErrors}
                onFilesAdd={fileUpload.addFiles}
                onFileRemove={fileUpload.removeFile}
                isLimitReached={fileUpload.isLimitReached}
                inputId="confirm-order-file-upload"
                label="Приложения к договору"
                variant="tiles"
              />
            </section>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
            fullWidth={false}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
            fullWidth={false}
          >
            {isSubmitting ? 'Создаём...' : 'Подтвердить и создать заявку'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
