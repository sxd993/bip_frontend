import { client } from "../client";

export const registerPhysicalPersonApi = async (data) => {
    const response = await client.post("/auth/register/physical", data);
    return response.data;
}

export const registerLegalEntityApi = async (data) => {
    const response = await client.post("/auth/register/legal", data);
    return response.data;
}

