import express from "express";
import { PORT } from "./config/index.js";
import router from "./routes/index.js";
import cors from "cors";
// import initializeDatabase from "./sequelize/initializeDatabase.js";
// import generateModelColumns from "./utils/generateModelColumns.js";
// import createModel from "./sequelize/createModel.js";

const app = express();

const initializeServer = () => {
    // TODO Configure this later
    app.use(cors());

    // TODO Add Limit on this
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use("/", router);
};

const server = app.listen(PORT, async () => {
    initializeServer();
    console.log("Listening on port: ", PORT);

    // async function createTable() {
    //     try {
    //         const newBook = await table.create({
    //             Index: 'testIdx',
    //             Title: 'John Doe',
    //             Publish_Date: 2024
    //         });
    //         console.log('Book created:', newBook.toJSON());
    //     } catch (error) {
    //         console.error('Error creating book:', error);
    //     }
    // }
    // createTable();

    // initializeDatabase();
});

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled rejection ${err.name} occurred`);
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});
