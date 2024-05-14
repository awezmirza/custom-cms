import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const DATABASE_NAME = process.env.DATABASE_NAME;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASS = process.env.MYSQL_PASS;

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export { PORT, NODE_ENV, DATABASE_NAME, MYSQL_USERNAME, MYSQL_PASS, USER_SERVICE_URL };
