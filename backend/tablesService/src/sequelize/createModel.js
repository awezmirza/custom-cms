import sequelize from './sequelize.js';

function createModel(tableName, columns) {
    const model = sequelize.define(tableName, columns);
    return model;
}

export default createModel;