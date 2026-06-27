import { client } from "@/shared/api/client";

export const getDealsApi = async ({ closed = false } = {}) => {
  const response = await client.get("/deals/get-deals", {
    params: closed ? { closed: true } : undefined,
  });
  return response.data;
};

export const createAppealApi = async (data) => {
  const response = await client.post("/deals/create/create-deal", data);
  return response.data;
};
