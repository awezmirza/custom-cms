import createModel from "../sequelize/createModel.js";
import initializeDatabase from "../sequelize/initializeDatabase.js";

class TableRepository {
    async createTable(tableId, modelColumns) {
        await createModel(tableId, modelColumns);
        await initializeDatabase();
    }
}

export default TableRepository;