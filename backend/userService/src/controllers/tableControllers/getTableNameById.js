import customError from "../../errors/errorUtils/customError.js";
import UserService from "../../services/userService.js";

const getTableNameById = async (req, res) => {

    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(400, "Token is required");
    }
    const userService = new UserService();
    const tokenData = userService.verifyToken(accessToken);

    const userId = tokenData.data.id;

    const { tableId } = req.params;
    const tableName = await userService.getTableNameById(userId, tableId);

    return res.status(200).json({
        message: "Table name fetched successfully",
        data: { tableName },
        success: true
    });
};

export default getTableNameById;
