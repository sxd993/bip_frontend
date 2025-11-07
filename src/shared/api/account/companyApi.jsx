import { client } from "../client";

export const getCompanyInfoApi = async () => {
    const response = await client.get("/personal_account/company/info");
    return response.data;
}

export const getCompanyEmployeesApi = async () => {
    const response = await client.get("/personal_account/company/employees");
    return response.data;
}

export const sendCompanyInviteApi = async (data) => {
    const response = await client.post("/personal_account/company/invite", data);
    return response.data;
}
