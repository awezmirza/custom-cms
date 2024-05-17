import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";

const deleteTable = async (req, res) => {
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

    const tableId = req.params.tableId;
    await userService.deleteTable(tokenData.data.id, tableId);

    return res.status(200).json({
        message: "Table deleted successfully",
        success: true
    });
};

export default deleteTable;
