import { useQuery } from "@tanstack/react-query"
import { getBalance } from "../api/BalanceApi";

export const Balance = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['balance'],
        queryFn: getBalance
    });

    if (isLoading) {
        return <div className="section">
            <h2>Транзакции</h2>
            <div className="loading-state">Загрузка транзакций...</div>
        </div>;
    }

    if (error) {
        return <div className="section">
            <h2>Транзакции</h2>
            <div className="error-state">Ошибка при загрузке транзакций: {error.message}</div>
        </div>;
    }

    return (
        <div className="section">
            <h2>Транзакции</h2>
            {!data?.transactions?.length && (
                <div className="no-transactions">Транзакции отсутствуют.</div>
            )}
            {data?.transactions?.length > 0 && (
                <div className="transactions-grid">
                    {data.transactions.map((transaction) => (
                        <div key={transaction.id} className="transaction-card">
                            <div className="transaction-header">
                                <h3 className="transaction-title">
                                    {transaction.transaction_type === 'income' ? 'Поступление' :
                                        transaction.transaction_type === 'expense' ? 'Списание' :
                                            transaction.transaction_type}
                                </h3>
                                <span className={`transaction-type type-${transaction.transaction_type}`}>
                                    {transaction.transaction_type === 'income' ? '📈' :
                                        transaction.transaction_type === 'expense' ? '📉' : '💳'}
                                </span>
                            </div>
                            <div className="transaction-details">
                                <div className="transaction-info-item">
                                    <span className="transaction-label">Сумма:</span>
                                    <span className={`transaction-amount ${transaction.transaction_type === 'income' ? 'amount-positive' : 'amount-negative'}`}>
                                        {transaction.transaction_type === 'income' ? '+' : '-'}{transaction.amount} ₽
                                    </span>
                                </div>
                                <div className="transaction-info-item">
                                    <span className="transaction-label">Тип:</span>
                                    <span className="transaction-value">
                                        {transaction.transaction_type === 'income' ? 'Поступление' :
                                            transaction.transaction_type === 'expense' ? 'Списание' :
                                                transaction.transaction_type}
                                    </span>
                                </div>
                                {transaction.date && (
                                    <div className="transaction-info-item">
                                        <span className="transaction-label">Дата:</span>
                                        <span className="transaction-value">
                                            {new Date(transaction.date).toLocaleDateString('ru-RU')}
                                        </span>
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