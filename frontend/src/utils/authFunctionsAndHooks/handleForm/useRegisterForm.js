import { isValidPassword, isValidEmail } from "../validators/validatorIndex.js";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_SERVICE_URL } from "../../constant.js";
import handleAccessToken from "../../handleAccessToken.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserAccessToken } from "../../../config/userDataSlice.js";
import { useState } from "react";

const useRegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleRegisterFormSubmit = async (event, inputs) => {
        try {
            event.preventDefault();
            if (!isValidEmail(inputs.email)) {
                return toast.error("Email is not valid");
            }

            if (inputs.password !== inputs.confirmPassword) {
                return toast.error("Passwords don't match");
            }

            const passwordErr = isValidPassword(inputs.password);
            if (passwordErr) {
                return toast.error(passwordErr);
            }

            const res = await toast.promise(
                axios.post(USER_SERVICE_URL + "/signup", {
                    email: inputs.email,
                    password: inputs.password
                }),
                {
                    pending: "Registering..."
                }
            );

            if (!res?.data?.data["access-token"]) {
                throw new Error("Something went wrong at server side");
            }

            handleAccessToken(res.data.data["access-token"]);
            dispatch(updateUserAccessToken(res.data.data["access-token"]));

            toast.success("Registered successfully");
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
        }
    };

    return { handleRegisterFormSubmit, handleChange, inputs };
};

export default useRegisterForm;
