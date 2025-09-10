// Утилиты для работы с файлами

// Конвертация файла в base64
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Убираем префикс "data:image/jpeg;base64," и оставляем только base64
            const base64 = reader.result.split(',')[1];
            resolve({
                name: file.name,
                base64: base64,
                type: file.type,
                size: file.size
            });
        };
        reader.onerror = error => reject(error);
    });
};

// Конвертация массива файлов в base64
export const filesToBase64 = async (files) => {
    try {
        const base64Files = await Promise.all(
            files.map(file => fileToBase64(file))
        );
        return base64Files;
    } catch (error) {
        console.error('Error converting files to base64:', error);
        throw error;
    }
};

// Валидация размера файла
export const validateFileSize = (file, maxSizeMB = 10) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
};

// Валидация типа файла
export const validateFileType = (file, allowedTypes = []) => {
    if (allowedTypes.length === 0) return true;
    return allowedTypes.includes(file.type);
};
