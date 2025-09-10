import { client } from '../../../shared/api/client';

export const getDealsApi = async () => {
    const response = await client.get('/deals/deals/get-deals');
    return response.data;
}

export const createAppealApi = async (data) => {
    const response = await client.post('/deals/create/create-deal', data);
    return response.data;
};

export const getDealStagesApi = async () => {
    const response = await client.get('/deals/create/get-scenarios');
    return response.data;
};

export const getAppealDetailsApi = async (dealId) => {
    const response = await client.get(`/deals/appeal/get-appeal-details/${dealId}`);
    return response.data;
};

export const sendReplyApi = async (dealId, message, files = []) => {
    const response = await client.post('/deals/reply/send-reply', {
        dealId,
        message,
        files
    });
    return response.data;
};

export const downloadFileApi = async (fileId) => {
    const response = await client.get(`/deals/files/download/${fileId}`, {
        responseType: 'blob',
    });
    return response.data;
};

export const getFileViewUrlApi = async (fileId) => {
    const response = await client.get(`/deals/files/view/${fileId}`);
    return response.data;
};

export const getDealFilesApi = async (dealId, latest = false) => {
    const params = latest ? '?latest=true' : '';
    const response = await client.get(`/deals/deal-files/get-deal-files/${dealId}${params}`);
    return response.data;
};

export const getLatestDealFilesApi = async (dealId) => {
    return await getDealFilesApi(dealId, true);
};