import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import { customError } from "../errors/errorUtils/index.js";
import TableService from "../service/tableService.js";

const addRow = async (req, res) => {
    // Validate Inputs
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "User not logged in");
    }
    const tableId = req.params.tableId;

    const rowData = req.body.rowData;

    if (!rowData) {
        throw new customError(400, "Row Data is required");
    }

    // Verify Table Ownership
    try {
        await axios.get(
            USER_SERVICE_URL + "/verify-table-ownership/" + tableId,
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );
    } catch (error) {
        throw new customError(
            error.response.status || 400,
            error.response.data.message || "Something went wrong"
        );
    }

    // Add row to table
    const tableService = new TableService();
    await tableService.addRow(tableId, rowData);

    return res.status(201).json({
        message: "Row Added Successfully",
        success: true
    });
};

export default addRow;
