import { useQuery } from '@tanstack/react-query';
import { getBalance } from '../api/BalanceApi';

export const Balance = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
  });

  if (isLoading) {
    return (
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Транзакции</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
          <span className="ml-3 text-gray-600">Загрузка транзакций...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Транзакции</h2>
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-center">Ошибка при загрузке транзакций: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-red-200 rounded-3xl p-8 mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Транзакции</h2>
      
      {!data?.transactions?.length && (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">Транзакции отсутствуют</p>
        </div>
      )}
      
      {data?.transactions?.length > 0 && (
        <div className="space-y-6">
          {data.transactions.map((transaction) => (
            <div key={transaction.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-red-200 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {transaction.transaction_type === 'income' ? 'Поступление' :
                   transaction.transaction_type === 'expense' ? 'Списание' :
                   transaction.transaction_type}
                </h3>
                <span className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  transaction.transaction_type === 'income' 
                    ? 'bg-green-100 text-green-800 border-2 border-green-200' 
                    : 'bg-red-100 text-red-800 border-2 border-red-200'
                }`}>
                  {transaction.transaction_type === 'income' ? '+' : '-'}
                  {transaction.amount} ₽
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Дата:</span> {new Date(transaction.created_at).toLocaleDateString('ru-RU')}
                </div>
                {transaction.description && (
                  <div>
                    <span className="font-medium">Описание:</span> {transaction.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};