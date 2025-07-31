import { client } from "../client";

export const addEmployeeApi = async (data) => {
    const response = await client.post("/personal_account/company/add-employee", data);
    return response.data;
}