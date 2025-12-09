import { useForm } from "react-hook-form"
import { useConfirmRegister } from "./useConfirmRegister";
import { useState, useRef, useEffect } from "react";

export const useEnterCodeForm = () => {
    // Форма
    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            code: ['', '', '', '', '', '']
        }
    })
    const { register, setError, watch, setValue } = form
    const {
        confirmRegistration,
        isPending,
        isError,
        errorMessage,
    } = useConfirmRegister();

    const codeValues = watch('code');
    const inputRefs = useRef([]);

    // Объединение значений в строку для валидации
    const codeString = codeValues.join('');

    // Валидация
    const codeField = register('code', {
        validate: (value) => {
            const codeStr = Array.isArray(value) ? value.join('') : value;
            if (!codeStr || codeStr.length !== 6) {
                return 'Введите код';
            }
            if (!/^\d{6}$/.test(codeStr)) {
                return 'Код должен содержать ровно 6 цифр';
            }
            return true;
        }
    })

    // Обработка ввода в отдельное поле
    const handleCodeInput = (index, value) => {
        // Разрешаем только цифры
        const digit = value.replace(/\D/g, '');
        if (digit.length > 1) return;

        const newCode = [...codeValues];
        newCode[index] = digit;
        setValue('code', newCode, { shouldValidate: true });

        // Автоматический переход к следующему полю
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !codeValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Обработка вставки
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newCode = [...codeValues];
        for (let i = 0; i < 6; i++) {
            newCode[i] = pastedData[i] || '';
        }
        setValue('code', newCode, { shouldValidate: true });
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    // Сабмит
    const onSubmit = async ({ code }) => {
        const codeStr = Array.isArray(code) ? code.join('') : code;
        try {
            await confirmRegistration(codeStr.trim());
        } catch (error) {
            if (!error?.response) {
                setError('code', {
                    type: 'manual',
                    message: error.message || 'Не удалось подтвердить код',
                });
            }
        }
    };

    return {
        ...form,
        codeField,
        onSubmit,
        isPending,
        isError,
        errorMessage,
        codeValues,
        inputRefs,
        handleCodeInput,
        handleKeyDown,
        handlePaste,
        codeString,
    }
}