import TableRepository from "../repository/tableRepository.js";
import { generateModelColumns } from "../utils/index.js"

class TableService {
    constructor() {
        this.tableRepository = new TableRepository();
    }

    async createTable(tableId, fields) {
        // Generate Model Columns
        const modelColumns = generateModelColumns(fields);
        await this.tableRepository.createTable(tableId, modelColumns);
    }

    async viewTable(tableId) {
        const tableData = await this.tableRepository.viewTable(tableId);
        return tableData;
    }

    async deleteTable(tableId) {
        await this.tableRepository.deleteTable(tableId);
    }
}

export default TableService;