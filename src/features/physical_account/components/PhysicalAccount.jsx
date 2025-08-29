import { Balance } from '../../../shared/components/Balance';
import AppealsSection from '../../deals/components/AppealsSection';
import { Loading } from '../../../shared/ui/Loading';

export const PhysicalAccount = ({ user, isLoading }) => {
    if (isLoading) {
        return <Loading />
    }
    

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12 mb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12 text-center">Личный кабинет физического лица</h1>

                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">Персональные данные</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                <span className="block text-sm font-medium text-gray-600 mb-2">ФИО</span>
                                <span className="text-lg text-gray-800">{user.last_name} {user.first_name} {user.second_name}</span>
                            </div>
                            <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                <span className="block text-sm font-medium text-gray-600 mb-2">Номер телефона</span>
                                <span className="text-lg text-gray-800">{user.phone}</span>
                            </div>
                            <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                <span className="block text-sm font-medium text-gray-600 mb-2">Электронная почта</span>
                                <span className="text-lg text-gray-800">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">Управление балансом</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="border-2 border-red-200 bg-red-50 p-8 rounded-2xl">
                                <span className="block text-sm font-medium text-gray-600 mb-3">Текущий баланс</span>
                                <span className="text-3xl font-bold text-red-600">{user.balance} ₽</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Транзакции */}
                <Balance />

                {/* Обращения */}
                <AppealsSection user={user} />
            </div>
        </div>
    );
};