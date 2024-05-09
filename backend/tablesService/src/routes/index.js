import express from "express";
import { asyncErrorHandler } from "../errors/errorUtils/index.js";
import errorMiddleware from "../errors/errorMiddlewares/errorMiddleware.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hello World!" });
});

router.use(errorMiddleware);

export default router;
