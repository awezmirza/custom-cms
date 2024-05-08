import { toast } from "react-toastify";
import {
    isValidPassword,
    isValidEmail,
    isInvalidUsername
} from "../validators/validatorIndex.js";

const useRegistrationOTPVerification = () => {

    const requestOtp = (inputs, setShowRegisterForm) => {
        if (!isValidEmail(inputs.email)) {
            return toast.error("Email is not valid");
        }

        const usernameError = isInvalidUsername(inputs.username);
        if (usernameError) {
            return toast.error(usernameError);
        }

        if (inputs.password !== inputs.confirmPassword) {
            return toast.error("Passwords don't match");
        }

        const passwordErr = isValidPassword(inputs.password);
        if (passwordErr) {
            return toast.error(passwordErr);
        }
        setShowRegisterForm(false);
    }


    return { requestOtp };

}

export default useRegistrationOTPVerification