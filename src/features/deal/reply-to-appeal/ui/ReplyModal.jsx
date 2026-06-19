import { useForm } from "react-hook-form";
import { useReplyModal } from "../model/useReplyModal";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { useFileUpload } from "@/shared/hooks/useFileUpload";
import ReplyFields from "./ReplyForm";
import { downloadFileApi } from "@/entities/deals";
import { REPLY_VALIDATION_RULES } from "../../create-appeal/model/constants";

const AppealFiles = ({ files }) => {
  if (files.length === 0) return null;

  const downloadDocument = async (documentId, fileName) => {
    try {
      const doc = files.find((d) => d.id === documentId);
      if (doc?.url) {
        window.open(doc.url, "_blank");
        return;
      }

      const blob = await downloadFileApi(documentId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Ошибка при скачивании файла");
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-medium text-text">Документы</p>
      {files.map((doc, index) => (
        <button
          key={doc.id || index}
          type="button"
          onClick={() => downloadDocument(doc.id, doc.name)}
          className="truncate text-left text-sm text-primary transition hover:text-primary-hover"
        >
          {doc.name}
        </button>
      ))}
    </div>
  );
};

export const ReplyModal = ({ isOpen, onClose, appealId }) => {
  const {
    appealMessage,
    files,
    isSuccess,
    error,
    isLoadingDetails,
    isSubmitting,
    handleSubmit,
    reset,
  } = useReplyModal(appealId);

  const fileUpload = useFileUpload();

  const {
    register,
    handleSubmit: handleFormSubmit,
    watch,
    reset: resetForm,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { message: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const isFormValid = isValid && fileUpload.fileErrors.length === 0;
  const messageValue = watch("message");

  const handleClose = () => {
    resetForm();
    reset();
    fileUpload.clearFiles();
    onClose();
  };

  const onFormSubmit = handleFormSubmit(async ({ message }) => {
    try {
      const base64Files = await fileUpload.getBase64Files();
      await handleSubmit(message, base64Files);
    } catch {
      // Ошибка уже в состоянии хука
    }
  });

  const errorText =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message ||
    null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ответ на обращение"
      size="md"
    >
      {isSuccess ? (
        <Modal.State
          variant="success"
          text="Сообщение отправлено"
          onConfirm={handleClose}
        />
      ) : isLoadingDetails ? (
        <Modal.State variant="loading" text="Загрузка..." />
      ) : (
        <form onSubmit={onFormSubmit} noValidate>
          <Modal.Body className="flex flex-col gap-4">
            {errorText && (
              <Modal.Message type="error">{errorText}</Modal.Message>
            )}

            {appealMessage && (
              <Modal.Message type="info">
                <span dangerouslySetInnerHTML={{ __html: appealMessage }} />
              </Modal.Message>
            )}

            <AppealFiles files={files} />

            <ReplyFields
              register={(field) =>
                register(field, REPLY_VALIDATION_RULES[field])
              }
              errors={errors}
              messageValue={messageValue}
              attachedFiles={fileUpload.attachedFiles}
              fileErrors={fileUpload.fileErrors}
              onFilesAdd={fileUpload.addFiles}
              onFileRemove={fileUpload.removeFile}
              isLimitReached={fileUpload.isLimitReached}
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
              disabled={!isFormValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};
