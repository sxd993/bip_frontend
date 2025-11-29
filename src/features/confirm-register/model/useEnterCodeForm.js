import { useForm } from "react-hook-form"
import { useConfirmRegister } from "./useConfirmRegister";

export const useEnterCodeForm = () => {

    // Форма
    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            code: ''
        }
    })
    const { register, setError } = form
    const {
        confirmRegistration,
        isPending,
        isError,
        errorMessage,
    } = useConfirmRegister();

    // Валидация
    const codeField = register('code', {
        required: 'Введите код',
        pattern: {
            value: /^\d{6}$/,
            message: 'Код должен содержать ровно 6 цифр'
        }
    })

    // Сабмит
    const onSubmit = async ({ code }) => {
        try {
            await confirmRegistration(code.trim());
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
    }
}
