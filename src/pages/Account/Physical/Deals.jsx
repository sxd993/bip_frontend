import { useQuery } from "@tanstack/react-query";
import { getDealsApi } from "../../../api/deals/dealsApi";

export const Deals = ({ contactId }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['deals', contactId],
        queryFn: () => getDealsApi({ contact_id: contactId }),
    });

    return (
        <div className="deals-container">
            <h2>Сделки</h2>
            {isLoading && <div>Загрузка сделок...</div>}
            {error && <div>Ошибка при загрузке сделок: {error.message}</div>}
            {!isLoading && !error && !data?.length && <p>Сделки отсутствуют.</p>}
            {data?.length > 0 && (
                <ul>
                    {data.map((deal) => (
                        <li key={deal.ID}>
                            <div>
                                <strong>{deal.TITLE}</strong>
                                <p>Статус: {deal.STAGE_NAME}</p>
                                <p>Сумма: {deal.OPPORTUNITY}</p>
                                <p>Дата создания: {new Date(deal.DATE_CREATE).toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};