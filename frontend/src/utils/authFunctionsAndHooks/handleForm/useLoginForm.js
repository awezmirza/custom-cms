import { toast } from "react-toastify";
import {
    isValidPassword,
    isValidEmail
} from "../../authFunctionsAndHooks/validators/validatorIndex.js";
import axios from "axios";
import { USER_SERVICE_URL } from "../../constant.js";
import handleAccessToken from "../../handleAccessToken.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserAccessToken } from "../../../config/userDataSlice.js";

const useLoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginSubmit = async (event, inputs) => {
        try {
            event.preventDefault();
            if (!isValidEmail(inputs.email)) {
                return toast.error("Email is not valid");
            }
            const passwordErr = isValidPassword(inputs.password);
            if (passwordErr) {
                return toast.error(passwordErr);
            }

            const res = await toast.promise(
                axios.post(USER_SERVICE_URL + "/login", {
                    email: inputs.email,
                    password: inputs.password
                }),
                {
                    pending: "Logging In..."
                }
            );

            if (!res?.data?.data["access-token"]) {
                throw new Error("Something went wrong at server side");
            }

            handleAccessToken(res.data.data["access-token"]);
            dispatch(updateUserAccessToken(res.data.data["access-token"]));

            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
        }
    };
    return handleLoginSubmit;
};

export default useLoginForm;
