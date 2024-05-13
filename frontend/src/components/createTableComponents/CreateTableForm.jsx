import useCreateTableForm from "./useCreateTableForm";
import Select from "react-select";
import { trueFalseOptions, typeOptions, selectStyles } from "./selectOptions";
import "../../styles/createTablePageStyles/createTableForm.css";

const CreateTableForm = () => {
    const {
        handleTableSubmit,
        fields,
        handleAddField,
        handleDeleteField,
        handleChange,
        tableName,
        setTableName
    } = useCreateTableForm();

    return (
        <form
            className="create-tbl-form"
            onSubmit={handleTableSubmit}
            noValidate
        >
            <div className="fields-container">
                <div className="fields">
                    <div className="create-table-input-container table-name-container">
                        <input
                            placeholder="Enter name of the table"
                            className="create-table-field"
                            name="table-name"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                        />
                    </div>
                    <div className="table-precaution">
                        <span className="material-symbols-rounded">
                            warning
                        </span>
                        Tables can have duplicate name but we don't recommend
                        you to do that
                    </div>
                </div>
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
                                        styles={selectStyles}
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
                                        styles={selectStyles}
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
                                        styles={selectStyles}
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
            </div>

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
