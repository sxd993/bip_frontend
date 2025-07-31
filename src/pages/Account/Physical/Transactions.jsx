import { useQuery } from "@tanstack/react-query"
import { getTransactionsApi } from "../../../api/transactions/transactionsApi";

export const Transactions = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactionsApi,
    });

    if (isLoading) {
        return <div>Загрузка транзакций...</div>;
    }
    return (

        <div>
            Ваши транзакции:
            {data.transactions.map( (transaction) => (
                <div key={transaction.id}>
                    <p>Сумма: {transaction.amount}</p>
                    <p> Тип: {transaction.transaction_type}</p>
                            </div>))
}
        </div>
    );
};