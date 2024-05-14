import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import { customError } from "../errors/errorUtils/index.js";
import TableService from "../service/tableService.js";

const createTable = async (req, res) => {

    // Validate Inputs
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "User not logged in");
    }
    const data = req.body?.formData
    if (!data?.tableName) {
        throw new customError(400, "Table name is required");
    }
    if (!data?.fields || data?.fields.length == 0) {
        throw new customError(400, "At least one field is required");
    }
    for (let i = 0; i < data.fields.length; i++) {
        const field = data.fields[i];
        if (!field.name) {
            throw new customError(400, "Field name can't be empty");
        }
    }

    // Send add table request with access token and table name to user service
    let tableId;
    try {
        const responseForTableID = await axios.patch(USER_SERVICE_URL + "/add-table", {
            tableName: data.tableName
        },
            {
                headers: {
                    "access-token": accessToken
                }
            }
        )
        // Get the received table id
        tableId = responseForTableID.data.data.tableId;
    } catch (error) {
        throw new customError(error.response.status || 400, error.response.data.message || "Something went wrong");
    }

    // Create table with the received table Id and fields
    const tableService = new TableService();
    await tableService.createTable(tableId, data.fields);

    return res.status(201).json({
        message: "Table Created Successfully",
        data: { tableId },
        success: true
    });
}

export default createTable;