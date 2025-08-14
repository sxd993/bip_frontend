import { client } from "./client";

export const getBalance = async () => {
    const response = await client.get('/transactions/get-transactions');
    return response.data;
};