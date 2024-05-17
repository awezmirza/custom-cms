import customError from "../../errors/errorUtils/customError.js";
import UserService from "../../services/userService.js";

const editTableName = async (req, res) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const tokenData = userService.verifyToken(accessToken);

    const userId = tokenData.data.id;
    const newTableName = req.body.tableName;
    if (!newTableName) {
        throw new customError(400, "Table name is required");
    }

    const { tableId } = req.params;
    await userService.editTableName(userId, tableId, newTableName);

    return res.status(200).json({
        message: "Table name updated successfully",
        success: true
    });
};

export default editTableName;
