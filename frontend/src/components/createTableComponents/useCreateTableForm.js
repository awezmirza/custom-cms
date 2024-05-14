import { useState } from "react";
import { toast } from "react-toastify";
import { TABLES_SERVICE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../config/userDataSlice";
import { useNavigate } from "react-router-dom";

const useCreateTableForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

            let requestFields = [];

            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (!field.name) {
                    return toast.error(
                        "Field name is required at Field Number " + (i + 1)
                    );
                }
                requestFields.push({
                    name: field.name,
                    required: field.required.value,
                    type: field.type.value,
                    unique: field.unique.value,
                })
            }

            const formData = { tableName, fields: requestFields };

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
                    pending: "Creating table..."
                }
            );

            toast.success(res.data.message || "Table created successfully");
            dispatch(fetchUserData());
            navigate("/table/" + res.data.data.tableId);
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
