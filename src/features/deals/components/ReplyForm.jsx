import { useFileUpload } from '../../../shared/hooks/useFileUpload';
import FileUploadSection from '../../../shared/components/FileUploadSection';
import { MESSAGE_CONSTRAINTS } from '../constants';

const ReplyForm = ({ message, setMessage, onSubmit, onCancel, isLoading }) => {
  const {
    attachedFiles,
    fileErrors,
    addFiles,
    removeFile,
    getBase64Files
  } = useFileUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || message.length > MESSAGE_CONSTRAINTS.MAX_LENGTH) {
      return;
    }

    const base64Files = await getBase64Files();
    onSubmit(message.trim(), base64Files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Поле сообщения */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ваш ответ:
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение с пояснениями"
          className="w-full p-2 border border-gray-200 rounded-2xl resize-none focus:border-red-500 focus:outline-none min-h-[80px]"
          rows={3}
          maxLength={MESSAGE_CONSTRAINTS.MAX_LENGTH}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Минимум {MESSAGE_CONSTRAINTS.MIN_LENGTH} символ</span>
          <span>{message.length}/{MESSAGE_CONSTRAINTS.MAX_LENGTH}</span>
        </div>
      </div>

      {/* Загрузка файлов */}
      <FileUploadSection
        attachedFiles={attachedFiles}
        fileErrors={fileErrors}
        onFilesAdd={addFiles}
        onFileRemove={removeFile}
        label="Прикрепить файлы"
      />

      {/* Кнопки */}
      <div className="flex gap-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium text-sm"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-3xl transition-colors duration-200 flex items-center justify-center gap-2 font-bold text-sm"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              Отправка...
            </>
          ) : (
            'Отправить ответ'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;