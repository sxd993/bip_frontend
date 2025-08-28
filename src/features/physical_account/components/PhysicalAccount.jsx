import { Balance } from '../../../shared/components/Balance';
import AppealsSection from '../../deals/components/AppealsSection';
import { Loading } from '../../../shared/ui/Loading';

export const PhysicalAccount = ({ user, isLoading }) => {
    if (isLoading) {
        return <Loading />
    }
    console.log(user)

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Личный кабинет физического лица</h1>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Персональные данные</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">ФИО</span>
                                <span className="text-lg text-gray-800">{user.last_name} {user.first_name} {user.second_name}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">Номер телефона</span>
                                <span className="text-lg text-gray-800">{user.phone}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">Электронная почта</span>
                                <span className="text-lg text-gray-800">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Управление балансом</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
                                <span className="block text-sm font-medium text-gray-600 mb-2">Текущий баланс</span>
                                <span className="text-3xl font-bold text-pink-600">{user.balance} ₽</span>
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