import { useForm } from 'react-hook-form';
import { Modal } from '../../../../shared/ui/Modal';
import { FormField, TextInput } from '../../../../shared/components/forms';
import { validationRules } from '../../../../shared/utils/validators';
import { useEditCompanyData } from '../../hooks/useEditPersonalData';
import { useState } from 'react';

export const EditCompanyDataModal = ({ isOpen, onClose, companyData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: companyData?.name || ''
    }
  });

  const { mutate, isUpdating, updateError } = useEditCompanyData();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setSuccessMessage('Данные компании успешно обновлены!');
        setTimeout(() => {
          reset();
          onClose();
          setSuccessMessage('');
        }, 1500);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактировать данные компании" size="md">
      <div className="px-4 py-6 space-y-6">
        {successMessage && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-700 font-medium text-sm">{successMessage}</p>
          </div>
        )}

        {updateError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium text-sm">{updateError}</p>
          </div>
        )}

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <p className="text-blue-700 text-sm font-medium">
            ℹ️ ИНН и другие реквизиты компании изменить нельзя
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Название компании" error={errors.name} required>
            <TextInput
              {...register('name', validationRules.required('Название компании'))}
              placeholder="ООО Компания"
              error={errors.name}
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