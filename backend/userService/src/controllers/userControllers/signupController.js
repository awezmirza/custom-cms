import UserService from "../../services/userService.js";
import {
    validateEmail,
    validatePassword
} from "../../utils/index.js";
import { customError } from "../../errors/errorUtils/index.js";

const signup = async (req, res) => {
    const email = req.body?.email?.toLowerCase();
    const password = req.body?.password;

    validateEmail(email);
    validatePassword(password);

    const userService = new UserService();

    // Checking if email already exists or not
    if (await userService.checkIfEmailExist(email)) {
        throw new customError(400, "Email Already Exists");
    }

    const response = await userService.signup({
        email,
        password
    });

    const token = userService.createToken({
        id: response.id,
        email: response.email
    });

    return res.status(201).json({
        message: "Account Created Successfully",
        data: { "access-token": token },
        success: true
    });
};

export default signup;
