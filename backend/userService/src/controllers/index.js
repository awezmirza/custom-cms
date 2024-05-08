import signup from "./userControllers/signupController.js";
import login from "./userControllers/loginController.js";
import verifyToken from "./userControllers/verifyTokenController.js";
import noRouteController from "./noRouteController.js";
import handleGoogleUser from "./userControllers/handleGoogleUser.js";
import requestOtp from "./resetPasswordControllers/requestOtp.js";
import resendOtp from "./resetPasswordControllers/resendOtp.js";
import submitOtp from "./resetPasswordControllers/submitOtp.js";

export {
    signup,
    login,
    verifyToken,
    noRouteController,
    handleGoogleUser,
    requestOtp,
    resendOtp,
    submitOtp
};
