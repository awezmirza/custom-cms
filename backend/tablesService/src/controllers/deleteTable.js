import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import { customError } from "../errors/errorUtils/index.js";
import TableService from "../service/tableService.js";

const deleteTable = async (req, res) => {
    // Validate Inputs
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "User not logged in");
    }
    const tableId = req.params.tableId;

    try {
        await axios.delete(USER_SERVICE_URL + "/delete-table/" + tableId, {
            headers: {
                "access-token": accessToken
            }
        });
    } catch (error) {
        throw new customError(
            error?.response?.status || 400,
            error?.response?.data?.message || "Something went wrong"
        );
    }

    // Create table with the received table Id and fields
    const tableService = new TableService();
    await tableService.deleteTable(tableId);

    return res.status(201).json({
        message: "Table Deleted Successfully",
        success: true
    });
};

export default deleteTable;
