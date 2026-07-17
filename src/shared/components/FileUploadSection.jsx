import { useEffect, useMemo, useState } from 'react';
import { formatFileSize } from '../utils/formatters';
import { FILE_CONSTRAINTS } from '@/shared/constants/fileConstraints';
import { DocumentIcon } from '@/shared/ui/DocumentIcon';

const isImageFile = (file) =>
  Boolean(file?.type?.startsWith('image/')) ||
  /\.(jpe?g|png|gif|webp)$/i.test(file?.name || '');

const FileTile = ({ file, index, onRemove, previewUrl }) => (
  <li className="relative aspect-square overflow-hidden rounded-xl border border-border bg-background">
    {previewUrl ? (
      <img
        src={previewUrl}
        alt={file.name}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-surface-muted/60">
        <DocumentIcon />
      </div>
    )}

    <button
      type="button"
      onClick={() => onRemove(index)}
      className="absolute right-1 top-0.5 cursor-pointer text-xl leading-none text-error transition hover:opacity-80"
      aria-label="Удалить файл"
    >
      ×
    </button>
  </li>
);

const FileUploadSection = ({
  attachedFiles,
  fileErrors,
  onFilesAdd,
  onFileRemove,
  isLimitReached = false,
  maxFiles = FILE_CONSTRAINTS.MAX_FILES,
  maxSizeMB = FILE_CONSTRAINTS.MAX_SIZE_MB,
  acceptTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  label = 'Прикрепить файлы',
  inputId = 'file-upload',
  variant = 'list',
}) => {
  const [previewUrls, setPreviewUrls] = useState({});

  useEffect(() => {
    const nextUrls = {};
    const created = [];

    attachedFiles.forEach((file, index) => {
      if (!isImageFile(file)) return;
      const url = URL.createObjectURL(file);
      nextUrls[index] = url;
      created.push(url);
    });

    setPreviewUrls(nextUrls);

    return () => {
      created.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [attachedFiles]);

  const tileClassName = useMemo(
    () =>
      variant === 'tiles'
        ? 'mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5'
        : 'mt-2 space-y-1.5',
    [variant],
  );

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onFilesAdd(files);
    event.target.value = '';
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-text">
        {label}{' '}
        <span className="text-text-muted">
          (до {maxFiles} файлов, {maxSizeMB} MB)
        </span>
      </label>

      {!isLimitReached ? (
        <div className="rounded-xl border border-dashed border-border bg-background p-4 text-center transition hover:border-primary">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id={inputId}
            accept={acceptTypes}
          />
          <label htmlFor={inputId} className="cursor-pointer">
            <p className="text-sm font-medium text-primary">Выбрать файлы</p>
            <p className="mt-1 text-xs text-text-muted">PDF, DOC, DOCX, JPG, PNG</p>
          </label>
        </div>
      ) : (
        <p className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-text-muted">
          Достигнут лимит: {maxFiles} файлов
        </p>
      )}

      {fileErrors.length > 0 && (
        <div className="mt-2 rounded-xl border border-red-200 bg-red-50 p-3">
          {fileErrors.map((fileError, index) => (
            <p key={index} className="text-xs text-red-700">
              {fileError}
            </p>
          ))}
        </div>
      )}

      {attachedFiles.length > 0 && (
        <ul className={tileClassName}>
          {attachedFiles.map((file, index) =>
            variant === 'tiles' ? (
              <FileTile
                key={`${file.name}-${index}`}
                file={file}
                index={index}
                onRemove={onFileRemove}
                previewUrl={previewUrls[index]}
              />
            ) : (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-surface-muted px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-text">{file.name}</p>
                  <p className="text-xs text-text-muted">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onFileRemove(index)}
                  className="shrink-0 text-sm text-text-muted transition hover:text-primary"
                  aria-label="Удалить файл"
                >
                  ×
                </button>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export default FileUploadSection;
