import axios from 'axios';
import { TABLES_SERVICE_URL } from './constant';

export const fetchTableData = async (tableId) => {
    try {
        const response = await axios.get(`${TABLES_SERVICE_URL}/view-table/${tableId}`);
        return response.data.data;
    } catch (error) {
        throw error.response.data.message;
    }
};