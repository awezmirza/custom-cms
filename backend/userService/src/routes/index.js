import express from "express";
import {
    verifyToken,
    login,
    signup,
    noRouteController,
    getMyDetails,
    addTable,
    getTableNameById,
    editTableName,
    deleteTable
} from "../controllers/index.js";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import { asyncErrorHandler } from "../errors/errorUtils/index.js";
import googleWebLoginRouter from "./googleWebLoginRouter.js";
import resetPasswordRouter from "./resetPasswordRouter.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hello World!" });
});

router.post("/signup", asyncErrorHandler(signup));
router.post("/login", asyncErrorHandler(login));
router.get("/verify-token", verifyToken);
router.get("/get-my-details", asyncErrorHandler(getMyDetails));

router.patch("/add-table", asyncErrorHandler(addTable));
router.get("/get-table-name/:tableId", asyncErrorHandler(getTableNameById));
router.patch("/edit-table-name/:tableId", asyncErrorHandler(editTableName));
router.delete("/delete-table/:tableId", asyncErrorHandler(deleteTable));

router.use("/google-web-login", googleWebLoginRouter);
router.use("/reset-password", resetPasswordRouter);

router.all("*", noRouteController);

router.use(errorMiddleware);

export default router;
