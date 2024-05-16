import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import customError from "../errors/errorUtils/customError.js";
import TableService from "../service/tableService.js";

const viewTable = async (req, res) => {

    // Get access token
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "User not logged in");
    }

    // Get Table Id
    const { tableId } = req.params;

    // Send the data to user service to verify token and table ownership 
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

    // Create table with the received table Id and fields
    const tableService = new TableService();
    const data = await tableService.viewTable(tableId);

    return res.status(201).json({
        message: "Table Fetched Successfully",
        data,
        success: true
    });
}

export default viewTable;