import { useState } from "react";
import { toast } from "react-toastify";
import { TABLES_SERVICE_URL } from "../../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";
// import {
//     isValidPassword,
//     isValidEmail
// } from "../../authFunctionsAndHooks/validators/validatorIndex.js";
// import axios from "axios";
// import { USER_SERVICE_URL } from "../../constant.js";
// import handleAccessToken from "../../handleAccessToken.js";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateUserAccessToken } from "../../../config/userDataSlice.js";

const useCreateTableForm = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const { accessToken } = useSelector(
        (state) => state.userDataSlice
    );

    const [tableName, setTableName] = useState("");
    const [fields, setFields] = useState([
        {
            name: "",
            type: { value: "STRING", label: "String" },
            required: { value: false, label: "False" },
            unique: { value: false, label: "False" }
        }
    ]);

    const handleTableSubmit = async (event) => {
        try {
            event.preventDefault();
            // Validation
            if (!tableName) {
                return toast.error(
                    "Table Name is required");
            }
            if (!fields || fields.length === 0) {
                return toast.error(
                    "At least one field is required");
            }
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (!field.name) {
                    return toast.error(
                        "Field name is required at Field Number " + (i + 1)
                    );
                }
            }

            const formData = { tableName, fields };

            const res = await toast.promise(
                axios.post(TABLES_SERVICE_URL + "/create-table", {
                    formData
                },
                    {
                        headers: {
                            "access-token": accessToken
                        }
                    }
                ),
                {
                    pending: "Logging In..."
                }
            );

            // if (!res?.data?.data["access-token"]) {
            //     throw new Error("Something went wrong at server side");
            // }

            // handleAccessToken(res.data.data["access-token"]);
            // dispatch(updateUserAccessToken(res.data.data["access-token"]));

            // toast.success("Logged in successfully");
            // navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong"
            );
        }
    };

    const handleChange = (idx, value, fieldName) => {
        const data = [...fields];
        data[idx][fieldName] = value;
        setFields(data);
    };

    const handleDeleteField = (idx) => {
        const data = [...fields];
        data.splice(idx, 1);
        setFields(data);
    };

    const handleAddField = () => {
        setFields([
            ...fields,
            {
                name: "",
                type: { value: "STRING", label: "String" },
                required: { value: false, label: "False" },
                unique: { value: false, label: "False" }
            }
        ]);
    };

    return {
        handleTableSubmit,
        fields,
        handleAddField,
        handleDeleteField,
        handleChange,
        tableName,
        setTableName
    };
};

export default useCreateTableForm;
