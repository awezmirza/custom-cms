import initializeDatabase from "../sequelize/initializeDatabase.js";
import sequelize from "../sequelize/sequelize.js";

class TableRepository {
    async createTable(tableId, modelColumns) {
        sequelize.define(tableId, modelColumns, {
            freezeTableName: true,
            timestamps: false
        });
        await initializeDatabase();
    }

    async viewTable(tableId) {
        const [tableColumns] = await sequelize.query(`SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableId}' AND COLUMN_NAME NOT IN ('createdAt', 'updatedAt')`);
        const [tableData] = await sequelize.query(`SELECT * FROM ${tableId}`);
        return { tableColumns, tableData };
    }

    async deleteTable(tableId) {
        await sequelize.query(`DROP TABLE IF EXISTS ${tableId};`);
    }

    async deleteRow(tableId, rowId) {
        await sequelize.query(
            `DELETE FROM ${tableId}
                WHERE id = ${rowId};`
        );
    }
}

export default TableRepository;