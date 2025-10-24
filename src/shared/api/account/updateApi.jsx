import { client } from "../client";

// Для физ. лица
export const updatePhysicalPersonApi = async (data) => {
    const response = await client.put("/user/update-personal-info", data);
    return response.data;
};

// Для юр. лица - обновление сотрудника
export const updateEmployeeDataApi = async (data) => {
    const response = await client.put("/personal_account/employee/update", data);
    return response.data;
};

// Для юр. лица - обновление компании (только для руководителя)
export const updateCompanyDataApi = async (data) => {
    const response = await client.put("/personal_account/company/update", data);
    return response.data;
};