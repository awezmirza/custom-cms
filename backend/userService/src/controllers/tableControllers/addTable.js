import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";

const addTable = async (req, res) => {
    // Verify access token
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const tokenData = userService.verifyToken(accessToken);
    if (!tokenData) {
        throw new customError(400, "Invalid token");
    }

    // Get the table name from request body
    const tableName = req.body?.tableName;
    if (!tableName) {
        throw new customError(400, "Table name is required");
    }
    const tableId = await userService.addTable(tokenData.data.id, tableName);

    return res.status(200).json({
        message: "Table added successfully",
        data: { tableId },
        success: true
    });
};

export default addTable;
