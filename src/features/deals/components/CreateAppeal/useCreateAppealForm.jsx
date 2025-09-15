import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppealCategories } from '../Appeals/useAppeals';
import { createAppealApi } from '../../../../shared/api/deals/dealsApi';
import { useFileUpload } from '../../../../shared/hooks/useFileUpload';

const FORM_DEFAULTS = {
    category_id: '',
    title: '',
    comment: ''
};

const VALIDATION_RULES = {
    category_id: { required: 'Выберите категорию' },
    title: { required: 'Введите заголовок' },
    comment: { required: 'Введите описание' }
};

export const useCreateAppealForm = (isOpen, onClose) => {
    const form = useForm({ defaultValues: FORM_DEFAULTS });
    const { register, handleSubmit, formState: { errors }, reset } = form;

    const fileUpload = useFileUpload();
    const { clearFiles, getBase64Files } = fileUpload;

    const { data: categories, isLoading: categoriesLoading } = useAppealCategories();

    const queryClient = useQueryClient();
    const createAppealMutation = useMutation({
        mutationFn: createAppealApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['appeals']);
        },
    });

    const isLoading = categoriesLoading;
    const isSuccess = createAppealMutation.isSuccess;
    const isSubmitting = createAppealMutation.isPending;
    const error = createAppealMutation.error;

    const onSubmit = async (data) => {
        if (!data.title.trim() || !data.comment.trim() || !data.category_id) {
            return;
        }

        try {
            const base64Files = await getBase64Files();

            // Убираем поле type которое сервер не принимает
            const cleanFiles = base64Files.map(file => {
                const { type, ...cleanFile } = file;
                console.log('Очищенный файл:', cleanFile);
                return cleanFile;
            });

            console.log('Отправляем данные:', {
                category_id: data.category_id,
                title: data.title,
                comment: data.comment,
                files: cleanFiles
            });

            await createAppealMutation.mutateAsync({
                category_id: data.category_id,
                title: data.title,
                comment: data.comment,
                files: cleanFiles
            });

            handleSuccessClose();
        } catch (error) {
            console.error('Ошибка создания обращения:', error);
        }
    };

    const handleSuccessClose = () => {
        resetAll();
        setTimeout(() => onClose(), 2000);
    };

    const resetAll = () => {
        reset();
        clearFiles();
        createAppealMutation.reset();
    };

    const handleClose = () => {
        resetAll();
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            createAppealMutation.reset();
        }
    }, [isOpen, createAppealMutation]);

    return {
        form: {
            register: (field) => register(field, VALIDATION_RULES[field]),
            handleSubmit: handleSubmit(onSubmit),
            errors,
            reset
        },
        fileUpload,
        categories,
        states: {
            isLoading,
            isSuccess,
            isSubmitting,
            error,
            categoriesLoading
        },
        actions: {
            handleClose,
            resetAll
        },
        errorMessage: error?.response?.data?.message || error?.message || 'Ошибка при создании обращения'
    };
};