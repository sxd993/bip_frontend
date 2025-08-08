import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEmployeeApi } from "../../../../api/personal_account/Emloyers";

export const AddEmployeeForm = ({ onClose, role }) => {
    const queryClient = useQueryClient();
    const { data: departments } = useQuery({
        queryKey: ['departments'],
        queryFn: getDepartamentApi,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            first_name: "",
            second_name: "",
            last_name: "",
            phone: "",
            email: "",
            password: "",
            role: "Сотрудник",
            department_id: ""
        }
    });

    const mutation = useMutation({
        mutationFn: addEmployeeApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
            onClose();
        },
        onError: (error) => {
            console.error("Error adding employee:", error);
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const availableRoles = role === 'Руководитель'
        ? [
            { value: "Сотрудник", label: "Сотрудник" },
            { value: "Руководитель отдела", label: "Руководитель отдела" }
        ]
        : [
            { value: "Сотрудник", label: "Сотрудник" }
        ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form 
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Добавить сотрудника</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    {/* Личные данные */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            Личные данные
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                    Фамилия <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    {...register("last_name", {
                                        required: "Фамилия обязательна",
                                        minLength: { value: 2, message: "Минимум 2 символа" }
                                    })}
                                    placeholder="Иванов"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                                        errors.last_name 
                                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                    }`}
                                />
                                {errors.last_name && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.last_name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Имя <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    {...register("first_name", {
                                        required: "Имя обязательно",
                                        minLength: { value: 2, message: "Минимум 2 символа" }
                                    })}
                                    placeholder="Иван"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                                        errors.first_name 
                                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                    }`}
                                />
                                {errors.first_name && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.first_name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="second_name" className="block text-sm font-medium text-gray-700">
                                    Отчество
                                </label>
                                <input
                                    type="text"
                                    id="second_name"
                                    {...register("second_name")}
                                    placeholder="Иванович"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-blue-500 hover:border-gray-300"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Контактная информация */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            Контактная информация
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Телефон <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register("phone", {
                                        required: "Телефон обязателен",
                                        pattern: {
                                            value: /^\+?[78]?[-\(]?\d{3}[-\)]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
                                            message: "Неверный формат телефона"
                                        }
                                    })}
                                    placeholder="+7 (999) 123-45-67"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                                        errors.phone 
                                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                    }`}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email обязателен",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Неверный формат email"
                                        }
                                    })}
                                    placeholder="ivan@company.com"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                                        errors.email 
                                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Системные настройки */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            Системные настройки
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Пароль <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        required: "Пароль обязателен",
                                        minLength: { value: 6, message: "Минимум 6 символов" }
                                    })}
                                    placeholder="Минимум 6 символов"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                                        errors.password 
                                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                    }`}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Роль <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="role"
                                    {...register("role", { required: "Выберите роль" })}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 bg-white ${
                                        errors.role 
                                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                    }`}
                                >
                                    {availableRoles.map(roleOption => (
                                        <option key={roleOption.value} value={roleOption.value}>
                                            {roleOption.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="department_id" className="block text-sm font-medium text-gray-700">
                                    Отдел
                                </label>
                                <select
                                    id="department_id"
                                    {...register("department_id")}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-blue-500 hover:border-gray-300 bg-white"
                                >
                                    <option value="">Выберите отдел</option>
                                    {departments?.departments?.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Ошибка */}
                    {mutation.error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700 font-medium">
                                    Ошибка: {mutation.error.message || 'Произошла ошибка при добавлении сотрудника'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isSubmitting ? 'Добавление...' : 'Добавить сотрудника'}
                    </button>
                </div>
            </form>
        </div>
    );
};