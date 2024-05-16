import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import { customError } from "../errors/errorUtils/index.js";
import TableService from "../service/tableService.js";

const deleteRow = async (req, res) => {
    // Validate Inputs
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "User not logged in");
    }
    const tableId = req.params.tableId;

    // Take the row Id
    const rowId = req.body.rowId;
    if (!rowId) {
        throw new customError(400, "Row id is required");
    }

    // Verify Table Ownership
    try {
        await axios.get(USER_SERVICE_URL + "/verify-table-ownership/" + tableId,
            {
                headers: {
                    "access-token": accessToken
                }
            }
        )
    } catch (error) {
        throw new customError(error.response.status || 400, error.response.data.message || "Something went wrong");
    }

    // Delete row from table
    const tableService = new TableService();
    await tableService.deleteRow(tableId, rowId);

    return res.status(201).json({
        message: "Row Deleted Successfully",
        success: true
    });
}

export default deleteRow;