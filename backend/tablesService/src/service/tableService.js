import TableRepository from "../repository/tableRepository.js";
import {
    generateModelColumns,
    generateModelRows,
    generateUpdateModelRows
} from "../utils/index.js";

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

    async deleteRow(tableId, rowId) {
        await this.tableRepository.deleteRow(tableId, rowId);
    }

    async addRow(tableId, rowData) {
        // validate row data
        const { tableColumns } = await this.viewTable(tableId);
        const { columnNameString, valuesString } = generateModelRows(
            rowData,
            tableColumns
        );
        await this.tableRepository.addRow(
            columnNameString,
            valuesString,
            tableId
        );
    }

    async updateRow(tableId, rowData, rowId) {
        // validate row data
        const { tableColumns } = await this.viewTable(tableId);
        const valuesString = generateUpdateModelRows(rowData, tableColumns);
        await this.tableRepository.updateRow(valuesString, tableId, rowId);
    }
}

export default TableService;
