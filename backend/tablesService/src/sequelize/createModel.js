import sequelize from './sequelize.js';

async function createModel(tableName, columns) {
    const model = sequelize.define(tableName, columns);
    return model;
}

export default createModel;