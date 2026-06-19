import { Modal } from "@/shared/ui/Modal";
import { Field } from "@/shared/ui/Field";
import { FieldControl } from "@/shared/ui/FieldControl";
import { FormLabel } from "@/shared/ui/FormLabel";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Button } from "@/shared/ui/Button";
import FileUploadSection from "@/shared/components/FileUploadSection";
import { useCreateAppealForm } from "../model/useCreateAppealForm";
import { APPEAL_FIELD_CONSTRAINTS } from "../model/constants";

const CreateAppealModal = ({ isOpen, onClose }) => {
  const { form, fileUpload, states, actions, errorMessage } =
    useCreateAppealForm(isOpen, onClose);

  const { isSuccess, isSubmitting, isError, error } = states;
  const { handleClose } = actions;
  const titleValue = form.watch("title");
  const commentValue = form.watch("comment");

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Новое обращение">
        <Modal.State
          variant="success"
          text="Обращение создано"
          onConfirm={handleClose}
        />
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Новое обращение"
      size="md"
    >
      <form onSubmit={form.handleSubmit} noValidate>
        <Modal.Body className="flex flex-col gap-4">
          {(isError || error) && (
            <Modal.Message type="error">{errorMessage}</Modal.Message>
          )}

          <Field error={form.errors.title?.message}>
            <FormLabel required>Заголовок</FormLabel>
            <FieldControl
              value={titleValue}
              {...APPEAL_FIELD_CONSTRAINTS.title}
            >
              <Input
                type="text"
                placeholder="Кратко опишите ситуацию"
                hasError={Boolean(form.errors.title)}
                maxLength={APPEAL_FIELD_CONSTRAINTS.title.max}
                className="pr-16"
                {...form.register("title")}
              />
            </FieldControl>
          </Field>

          <Field error={form.errors.comment?.message}>
            <FormLabel required>Описание</FormLabel>
            <FieldControl
              value={commentValue}
              {...APPEAL_FIELD_CONSTRAINTS.comment}
            >
              <Textarea
                rows={4}
                placeholder="Расскажите подробнее..."
                hasError={Boolean(form.errors.comment)}
                maxLength={APPEAL_FIELD_CONSTRAINTS.comment.max}
                className="pb-8"
                {...form.register("comment")}
              />
            </FieldControl>
          </Field>

          <FileUploadSection
            attachedFiles={fileUpload.attachedFiles}
            fileErrors={fileUpload.fileErrors}
            onFilesAdd={fileUpload.addFiles}
            onFileRemove={fileUpload.removeFile}
            isLimitReached={fileUpload.isLimitReached}
            inputId="create-appeal-file-upload"
          />
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
            disabled={!form.isFormValid || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Отправка..." : "Создать"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateAppealModal;
