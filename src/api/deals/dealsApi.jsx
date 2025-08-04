import { client } from '../client'

export const getDealsApi = async () => {
    const response = await client.get('/deals/get-deals');
    return response.data;
}
