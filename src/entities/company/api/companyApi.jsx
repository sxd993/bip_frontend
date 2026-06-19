import { client } from "@/shared/api/client";

export const getCompanyInfoApi = async () => {
  const response = await client.get("/personal_account/company/info");
  return response.data;
};

export const getCompanyEmployeesApi = async () => {
  const response = await client.get("/personal_account/company/employees");
  return response.data;
};

export const getCompanyInvitesApi = async () => {
  const response = await client.get("/personal_account/company/invites");
  return response.data;
};

export const inviteEmployeeApi = async (email) => {
  const response = await client.post("/personal_account/company/invite", {
    email,
  });
  return response.data;
};

export const removeEmployeeApi = async (employeeId) => {
  const response = await client.delete(
    `/personal_account/company/employees/${employeeId}`,
  );
  return response.data;
};
