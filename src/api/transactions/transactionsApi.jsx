import { client } from "../client";

export const getTransactionsApi = async () => {
    const response = await client.get('/transactions/get-transactions');
    return response.data;
};