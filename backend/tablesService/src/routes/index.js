import express from "express";
import { asyncErrorHandler } from "../errors/errorUtils/index.js";
import errorMiddleware from "../errors/errorMiddlewares/errorMiddleware.js";
import {
    addRow,
    createTable,
    deleteRow,
    deleteTable,
    updateRow,
    viewTable
} from "../controllers/index.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hello World!" });
});

router.post("/create-table", asyncErrorHandler(createTable));
router.get("/view-table/:tableId", asyncErrorHandler(viewTable));
router.delete("/delete-table/:tableId", asyncErrorHandler(deleteTable));

router.delete("/delete-row/:tableId", asyncErrorHandler(deleteRow));
router.patch("/add-row/:tableId", asyncErrorHandler(addRow));
router.patch("/update-row/:tableId", asyncErrorHandler(updateRow));

router.use(errorMiddleware);

export default router;
