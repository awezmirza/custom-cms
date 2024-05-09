import { Sequelize } from "sequelize";
import { DATABASE_NAME, MYSQL_PASS, MYSQL_USERNAME } from "../config/index.js";

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(DATABASE_NAME, MYSQL_USERNAME, MYSQL_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;