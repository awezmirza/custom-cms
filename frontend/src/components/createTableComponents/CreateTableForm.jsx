import { useState } from "react";
import useCreateTableForm from "./useCreateTableForm";
import Select from "react-select";
import { trueFalseOptions, typeOptions } from "./selectOptions";
import "../../styles/createTablePageStyles/createTableForm.css";

const CreateTableForm = () => {
    const [fields, setFields] = useState([
        {
            name: "",
            type: { value: "STRING", label: "String" },
            required: { value: false, label: "False" },
            unique: { value: false, label: "False" }
        }
    ]);

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

    const { handleTableSubmit } = useCreateTableForm();

    return (
        <form onSubmit={(e) => handleTableSubmit(e, fields)} noValidate>
            {fields.map((field, idx) => {
                return (
                    <div className="fields" key={idx}>
                        <div className="field-number">
                            Field Number {idx + 1}
                        </div>
                        <div className="field-container">
                            <div className="create-table-input-container name-container">
                                <input
                                    placeholder="Name of the field"
                                    className="create-table-field"
                                    name="name"
                                    value={field.name}
                                    onChange={(e) =>
                                        handleChange(
                                            idx,
                                            e.target.value,
                                            "name"
                                        )
                                    }
                                />
                            </div>
                            <div className="create-table-input-container type-container">
                                <div>Type:</div>
                                <Select
                                    value={field.type}
                                    onChange={(value) =>
                                        handleChange(idx, value, "type")
                                    }
                                    name="type"
                                    options={typeOptions}
                                />
                            </div>
                            <div className="create-table-input-container type-container">
                                <div>Required: </div>
                                <Select
                                    value={field.required}
                                    onChange={(value) =>
                                        handleChange(idx, value, "required")
                                    }
                                    name="required"
                                    options={trueFalseOptions}
                                />
                            </div>
                            <div className="create-table-input-container type-container">
                                <div>Only unique: </div>
                                <Select
                                    value={field.unique}
                                    onChange={(value) =>
                                        handleChange(idx, value, "unique")
                                    }
                                    name="unique"
                                    options={trueFalseOptions}
                                />
                            </div>
                            <button
                                type="button"
                                className="dlt-field-btn create-table-input-container type-container"
                                onClick={() => {
                                    handleDeleteField(idx);
                                }}
                            >
                                <span className="material-symbols-rounded">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                );
            })}

            <div className="submit-and-add-container">
                <div className="line-container">
                    <div className="line"></div>
                    <span
                        onClick={handleAddField}
                        className="or-text material-symbols-rounded create-table-add-icon"
                    >
                        add_circle
                    </span>
                    <div className="line"></div>
                </div>

                <button className="create-table-btn" type="submit">
                    Create Table
                </button>
            </div>
        </form>
    );
};

export default CreateTableForm;
