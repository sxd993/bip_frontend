import { client } from "../../../shared/api/client";

export const registerPhysicalPersonApi = async (data) => {
    const response = await client.post("/auth/register/physical", data);
    return response.data;
}

export const registerLegalEntityApi = async (data) => {
    const response = await client.post("/auth/register/legal", data);
    return response.data;
}

export const registerEmployeeApi = async (data) => {
    const response = await client.post("/auth/register/employee", data);
    return response.data;
}