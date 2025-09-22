import { client } from "../client";

export const getUser = async () => {
    try {
        const response = await client.get("/user/get-info");
        return response.data; // пользователь авторизован
    } catch (err) {
        if (err.response?.status === 401) {
            return null; // не авторизован
        }
        throw err; // другая ошибка
    }
}