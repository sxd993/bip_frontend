import { Field } from '@/shared/ui/Field';
import { FieldControl } from '@/shared/ui/FieldControl';
import { FormLabel } from '@/shared/ui/FormLabel';
import { Textarea } from '@/shared/ui/Textarea';
import FileUploadSection from '@/shared/components/FileUploadSection';
import { MESSAGE_CONSTRAINTS, APPEAL_FIELD_CONSTRAINTS } from '../../create-appeal/model/constants';

const ReplyFields = ({
  register,
  errors,
  messageValue,
  attachedFiles,
  fileErrors,
  onFilesAdd,
  onFileRemove,
  isLimitReached = false,
}) => (
  <>
    <Field error={errors.message?.message}>
      <FormLabel required>Ответ</FormLabel>
      <FieldControl
        value={messageValue}
        {...APPEAL_FIELD_CONSTRAINTS.message}
      >
        <Textarea
          {...register('message')}
          placeholder="Ваш комментарий"
          rows={4}
          maxLength={MESSAGE_CONSTRAINTS.MAX_LENGTH}
          hasError={Boolean(errors.message)}
          className="pb-8"
        />
      </FieldControl>
    </Field>

    <FileUploadSection
      attachedFiles={attachedFiles}
      fileErrors={fileErrors}
      onFilesAdd={onFilesAdd}
      onFileRemove={onFileRemove}
      isLimitReached={isLimitReached}
      inputId="reply-file-upload"
    />
  </>
);

export default ReplyFields;
