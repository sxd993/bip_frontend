import { client } from '../../../shared/api/client';

export const deleteEmployeeRequest = async (employeeId) => {
  const response = await client.delete(`/personal_account/company/employees/${employeeId}`);
  return response.data;
};
