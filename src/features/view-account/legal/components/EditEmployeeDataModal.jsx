import { useForm } from 'react-hook-form';
import { Modal } from '../../../../shared/ui/Modal';
import { FormField, TextInput, PhoneInput } from '../../../../shared/components/forms';
import { validationRules } from '../../../../shared/utils/validators';
import { normalizePhoneForServer } from '../../../../shared/utils/formatters';
import { useEditEmployeeData } from '../../hooks/useEditPersonalData';

export const EditEmployeeDataModal = ({ isOpen, onClose, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      second_name: user?.second_name || '',
      email: user?.email || '',
      phone: user?.phone || '+7 ',
    },
  });

  const phoneValue = watch('phone');
  const { mutate, isUpdating, updateError, isSuccess } = useEditEmployeeData();

  const onSubmit = (data) => {
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      second_name: data.second_name,
      email: data.email,
      phone: normalizePhoneForServer(data.phone),
    };

    mutate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактировать данные сотрудника" size="lg">
      <div className="px-4 py-6 space-y-6">
        {isSuccess && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-700 font-medium text-sm">
              Данные успешно обновлены
            </p>
          </div>
        )}

        {updateError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 font-medium text-sm">{updateError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Фамилия" error={errors.last_name} required>
            <TextInput
              {...register('last_name', validationRules.required('Фамилия'))}
              placeholder="Ваша фамилия"
              error={errors.last_name}
            />
          </FormField>

          <FormField label="Имя" error={errors.first_name} required>
            <TextInput
              {...register('first_name', validationRules.required('Имя'))}
              placeholder="Ваше имя"
              error={errors.first_name}
            />
          </FormField>

          <FormField label="Отчество" error={errors.second_name}>
            <TextInput
              {...register('second_name')}
              placeholder="Ваше отчество"
              error={errors.second_name}
            />
          </FormField>

          <FormField label="Email" error={errors.email} required>
            <TextInput
              {...register('email', validationRules.email)}
              type="email"
              placeholder="your@email.com"
              error={errors.email}
            />
          </FormField>

          <FormField label="Номер телефона" error={errors.phone} required>
            <PhoneInput
              {...register('phone', validationRules.phone)}
              value={phoneValue}
              setValue={setValue}
              error={errors.phone}
            />
          </FormField>

          <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-3xl transition-colors duration-200 flex items-center justify-center gap-2 font-bold"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Сохранение...
                </>
              ) : (
                'Сохранить изменения'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
