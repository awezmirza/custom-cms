import customError from "../errors/errorUtils/customError.js";
import initializeDatabase from "../sequelize/initializeDatabase.js";
import sequelize from "../sequelize/sequelize.js";

class TableRepository {
    async createTable(tableId, modelColumns) {
        try {
            sequelize.define(tableId, modelColumns, {
                freezeTableName: true,
                timestamps: false
            });
        } catch (error) {
            throw new customError(
                400,
                error?.errors[0]?.message || "Database Error"
            );
        }
        await initializeDatabase();
    }

    async viewTable(tableId) {
        try {
            const [tableColumns] = await sequelize.query(
                `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableId}' AND COLUMN_NAME NOT IN ('createdAt', 'updatedAt')`
            );
            const [tableData] = await sequelize.query(
                `SELECT * FROM ${tableId}`
            );
            return { tableColumns, tableData };
        } catch (error) {
            throw new customError(
                400,
                error?.errors[0]?.message || "Database Error"
            );
        }
    }

    async deleteTable(tableId) {
        try {
            await sequelize.query(`DROP TABLE IF EXISTS ${tableId};`);
        } catch (error) {
            throw new customError(
                400,
                error?.errors[0]?.message || "Database Error"
            );
        }
    }

    async deleteRow(tableId, rowId) {
        try {
            await sequelize.query(
                `DELETE FROM ${tableId}
                WHERE id = ${rowId};`
            );
        } catch (error) {
            throw new customError(
                400,
                error?.errors[0]?.message || "Database Error"
            );
        }
    }

    async addRow(columnNameString, valuesString, tableId) {
        try {
            await sequelize.query(
                `INSERT INTO ${tableId} (${columnNameString})
                    VALUES (${valuesString});`
            );
        } catch (error) {
            throw new customError(
                400,
                error?.errors[0]?.message || "Database Error"
            );
        }
    }

    async updateRow(valuesString, tableId, rowId) {
        try {
            await sequelize.query(
                `UPDATE ${tableId} 
                SET ${valuesString}
                WHERE id = ${rowId};`
            );
        } catch (error) {
            throw new customError(
                400,
                error?.errors[0]?.message || "Database Error"
            );
        }
    }
}

export default TableRepository;
