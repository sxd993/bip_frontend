import { client } from "./client";

export const getUserApi = async () => {
    const response = await client.get("/user/get-info");
    return response.data;
}