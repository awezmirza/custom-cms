import UserService from "../../services/userService.js";
import { customError } from "../../errors/errorUtils/index.js";
import validatePassword from "../../utils/validatePassword.js";

const login = async (req, res) => {
    const email = req.body.email?.toLowerCase();
    const password = req.body.password;
    if (!(email)) {
        throw new customError(400, "Email is required");
    }
    validatePassword(password);

    const userService = new UserService();
    const response = await userService.login(email, password);

    return res.status(200).json({
        message: "Logged In Successfully",
        data: {
            "access-token": response
        },
        success: true
    });
};

export default login;
