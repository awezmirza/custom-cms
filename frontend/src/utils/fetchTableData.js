import axios from 'axios';
import { TABLES_SERVICE_URL } from './constant';

export const fetchTableData = async (tableId, accessToken) => {
    try {

        const response = await axios.get(`${TABLES_SERVICE_URL}/view-table/${tableId}`,
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data?.message || "Something went wrong";
    }
};