import { client } from "../client";

export const addDeparamentApi = async (name) => {
    const response = await client.post(`personal_account/departaments/create?name=${encodeURIComponent(name)}`);
    return response.data;
}

export const getDepartamentApi = async () => {
    const response = await client.get(`personal_account/departaments/get`);
    return response.data;
}