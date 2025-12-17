import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppealCategories } from '../../view-appeals/model/useAppeals';
import { createAppealApi } from '../../../entities/deal/api/dealsApi';
import { useFileUpload } from '../../../shared/hooks/useFileUpload';
import { VALIDATION_RULES, FORM_DEFAULTS } from './constants';



export const useCreateAppealForm = (isOpen, onClose) => {
    const form = useForm({ defaultValues: FORM_DEFAULTS });
    const { register, handleSubmit, formState: { errors }, reset } = form;
    const [countdown, setCountdown] = useState(null);

    const fileUpload = useFileUpload();
    const { clearFiles, getBase64Files } = fileUpload;
    const clearFilesRef = useRef(clearFiles);

    useEffect(() => {
        clearFilesRef.current = clearFiles;
    }, [clearFiles]);

    const { data: categories, isLoading: categoriesLoading } = useAppealCategories();

    const queryClient = useQueryClient();
    const createAppealMutation = useMutation({
        mutationFn: createAppealApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['appeals']);
            setCountdown(3);
        },
    });

    const {
        isSuccess,
        isPending: isSubmitting,
        isError,
        error,
        reset: resetMutation
    } = createAppealMutation;

    const isLoading = categoriesLoading;

    const onSubmit = async (data) => {
        if (!data.title.trim() || !data.comment.trim() || !data.category_id) {
            return;
        }

        try {
            const base64Files = await getBase64Files();
            const cleanFiles = base64Files.map(file => {
                const { type: _type, ...cleanFile } = file;
                return cleanFile;
            });

            await createAppealMutation.mutateAsync({
                category_id: data.category_id,
                title: data.title,
                comment: data.comment,
                files: cleanFiles
            });
        } catch (error) {
            console.error('Ошибка создания обращения:', error);
        }
    };

    const resetAll = () => {
        reset();
        clearFiles();
        resetMutation();
        setCountdown(null);
    };

    const handleClose = () => {
        resetAll();
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            resetMutation();
            setCountdown(null);
        }
    }, [isOpen, resetMutation]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (!isSuccess) {
            return;
        }

        if (countdown === null) {
            return;
        }

        if (countdown === 0) {
            reset();
            clearFilesRef.current?.();
            resetMutation();
            setCountdown(null);
            onClose();
            return;
        }

        const timer = setTimeout(() => setCountdown((prev) => (prev !== null ? prev - 1 : null)), 1000);

        return () => clearTimeout(timer);
    }, [isOpen, countdown, isSuccess, onClose, reset, resetMutation]);

    useEffect(() => {
        if (isError) {
            setCountdown(null);
        }
    }, [isError]);

    return {
        form: {
            register: (field) => register(field, VALIDATION_RULES[field]),
            handleSubmit: handleSubmit(onSubmit),
            errors,
            reset,
            getValues: form.getValues
        },
        fileUpload,
        categories,
        states: {
            isLoading,
            isSuccess,
            isSubmitting,
            isError,
            error,
            categoriesLoading,
            countdown
        },
        actions: {
            handleClose,
            resetAll
        },
        errorMessage: error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Ошибка при создании обращения'
    };
};
