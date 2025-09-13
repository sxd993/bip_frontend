const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const FileUploadSection = ({ 
    attachedFiles, 
    fileErrors, 
    onFilesAdd, 
    onFileRemove,
    maxSizeMB = 10,
    acceptTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
    label = "Прикрепить файлы"
  }) => {
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      onFilesAdd(files);
      // Очищаем input для повторного выбора тех же файлов
      event.target.value = '';
    };
  
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (макс. {maxSizeMB}MB каждый)
        </label>
  
        {/* Drag & Drop зона */}
        <div className="border border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-red-300 transition-colors duration-200">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept={acceptTypes}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <svg className="w-8 h-8 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-red-600 mb-1 font-medium text-sm">Нажмите для выбора файлов</p>
            <p className="text-xs text-red-500">PDF, DOC, DOCX, JPG, PNG до {maxSizeMB}MB</p>
          </label>
        </div>
  
        {/* Ошибки файлов */}
        {fileErrors.length > 0 && (
          <div className="mt-2 bg-red-50 border border-red-200 rounded-2xl p-2">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-red-700 text-sm font-medium mb-1">Ошибки файлов:</p>
                {fileErrors.map((error, index) => (
                  <p key={index} className="text-red-600 text-xs">• {error}</p>
                ))}
              </div>
            </div>
          </div>
        )}
  
        {/* Список выбранных файлов */}
        {attachedFiles.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Выбранные файлы:</h4>
            <div className="space-y-1">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 border border-red-100 rounded-2xl">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-700 truncate">{file.name}</p>
                      <p className="text-xs text-red-500">({formatFileSize(file.size)})</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onFileRemove(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 ml-2 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default FileUploadSection;