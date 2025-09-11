import { STATUS_COLORS, STAGE_COLORS, FILE_CONSTRAINTS } from '../constants';

//=== Форматирование ===
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) + ' в ' + date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('ru-RU') + ' ₽';
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatAppealNumber = (id) => `#${id}`;

export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// === Статусы ===
export const getStatusColor = (statusColor, stageId) => {
    if (statusColor && STATUS_COLORS[statusColor]) {
        return STATUS_COLORS[statusColor];
    }
    return STAGE_COLORS[stageId] || STATUS_COLORS.gray;
};

// === Файлы ===
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve({
                name: file.name,
                base64: base64,
                type: file.type,
                size: file.size
            });
        };
        reader.onerror = reject;
    });
};

export const filesToBase64 = async (files) => {
    try {
        return await Promise.all(files.map(file => fileToBase64(file)));
    } catch (error) {
        console.error('Error converting files to base64:', error);
        throw error;
    }
};

export const validateFileSize = (file, maxSizeMB = FILE_CONSTRAINTS.MAX_SIZE_MB) => {
    return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (file) => {
    return FILE_CONSTRAINTS.ALLOWED_MIME_TYPES.includes(file.type);
};

export const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
};

export const validateFiles = (files) => {
    const errors = [];

    files.forEach((file, index) => {
        if (!validateFileSize(file)) {
            errors.push(`Файл "${file.name}" превышает размер ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB`);
        }

        if (!validateFileType(file)) {
            errors.push(`Файл "${file.name}" имеет недопустимый тип`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};