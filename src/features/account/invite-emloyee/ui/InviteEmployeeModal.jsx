import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../shared/ui/Modal';
import SuccessScreen from '../../../shared/components/SuccessScreen';
import { useInviteEmployee } from '../../account/invite-emloyee/model/useInviteEmployee';

const InviteEmployeeModal = ({ isOpen, onClose, onInviteSent }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: ''
    }
  });

  const inviteMutation = useInviteEmployee({
    onSuccess: (data, variables, context) => {
      if (typeof onInviteSent === 'function') {
        onInviteSent(data, variables, context);
      }
    }
  });

  useEffect(() => {
    if (!isOpen) {
      inviteMutation.reset();
      reset();
    }
    // depends только от открытия/закрытия модалки, иначе reset зациклит рендер
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    inviteMutation.reset();
    reset();
    onClose();
  };

  const onSubmit = (values) => {
    inviteMutation.mutate(values);
  };

  const errorMessage =
    inviteMutation.error?.response?.data?.error ||
    inviteMutation.error?.message;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Пригласить сотрудника"
    >
      {inviteMutation.isSuccess ? (
        <div className="p-6">
          <SuccessScreen
            title="Приглашение отправлено"
            description="Мы отправили письмо с анкетой и ссылкой на регистрацию. Сотрудник сможет заполнить её, перейдя из почты."
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 border border-gray-200 rounded-3xl text-gray-700 hover:border-gray-300 transition-colors duration-200 font-medium"
              onClick={() => {
                inviteMutation.reset();
                reset();
              }}
            >
              Пригласить ещё
            </button>
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl font-bold transition-colors duration-200"
              onClick={handleClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email сотрудника
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Введите email сотрудника',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Некорректный email'
                }
              })}
              className={`w-full px-4 py-3 border rounded-2xl bg-white focus:outline-none transition-colors duration-200 ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                }`}
              placeholder="name@company.ru"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
            <p className="text-sm text-gray-500">
              Мы отправим приглашение с уникальной ссылкой, в которой уже будет
              токен вашей компании.
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-gray-100">
            <button
              type="button"
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
              onClick={handleClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={inviteMutation.isPending}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl transition-colors duration-200 font-bold disabled:opacity-50"
            >
              {inviteMutation.isPending ? 'Отправка...' : 'Отправить приглашение'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default InviteEmployeeModal;
