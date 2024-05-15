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
        // await sequelize.query("insert into table_c20bdf5b_9a47_484b_af1d_2c6b2bce2158(afifa, Awez_Mirza, saad) Values ('ok', 'hi', true)");
        const [tableData] = await sequelize.query(`SELECT * FROM ${tableId}`);
        // console.log(tableColumns);
        // console.log(tableData);
        return { tableColumns, tableData };
    }
}

export default TableRepository;