import { client } from "../../../shared/api/client";

export const getUser = async () => {
    try {
        const response = await client.get("/user/get-info");
        return response.data;
    } catch (err) {
        if (err.response?.status === 401) {
            return null;
        }
        throw err;
    }
}