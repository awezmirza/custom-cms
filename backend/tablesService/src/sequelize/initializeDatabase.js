import sequelize from "./sequelize.js";

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("Database synchronized successfully");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

export default initializeDatabase;
