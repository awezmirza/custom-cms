import IntegerInput from "../formInputComponents/IntegerInput";
import StringInput from "../formInputComponents/StringInput";
import BoolInput from "../formInputComponents/BoolInput";
import DateInput from "../formInputComponents/DateInput";
import "../../../styles/tablePageStyles/addRowForm.css";
import useHandleAddRowSubmit from "./useHandleAddRowSubmit";

const AddRowFormLowerPart = ({ setShowAddRow }) => {
    const { handleAddRowSubmit, fields, setFields, tableColumnData } =
        useHandleAddRowSubmit(setShowAddRow);

    return (
        <form className="add-row-form" onSubmit={handleAddRowSubmit} noValidate>
            <div className="add-row-fields-container">
                {tableColumnData.map((column, idx) => {
                    if (column.COLUMN_NAME !== "id")
                        return (
                            <div className="add-row-fields" key={idx}>
                                <h2 className="field-number">
                                    {column.COLUMN_NAME}
                                    <span className="required-mark">
                                        {column.IS_NULLABLE === "YES" ? (
                                            <></>
                                        ) : (
                                            <>*</>
                                        )}
                                    </span>
                                </h2>
                                <div className="create-table-input-container name-container">
                                    {column.DATA_TYPE === "datetime" && (
                                        <DateInput
                                            name={column.COLUMN_NAME}
                                            data={fields[column.COLUMN_NAME]}
                                            fields={fields}
                                            setFields={setFields}
                                        />
                                    )}
                                    {column.DATA_TYPE === "int" && (
                                        <IntegerInput
                                            name={column.COLUMN_NAME}
                                            data={fields[column.COLUMN_NAME]}
                                            fields={fields}
                                            setFields={setFields}
                                        />
                                    )}
                                    {column.DATA_TYPE === "varchar" && (
                                        <StringInput
                                            name={column.COLUMN_NAME}
                                            data={fields[column.COLUMN_NAME]}
                                            fields={fields}
                                            setFields={setFields}
                                        />
                                    )}
                                    {column.DATA_TYPE === "tinyint" && (
                                        <BoolInput
                                            name={column.COLUMN_NAME}
                                            data={fields[column.COLUMN_NAME]}
                                            fields={fields}
                                            setFields={setFields}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                })}
            </div>
            <div className="add-row-btn-container">
                <button className="add-row-btn" type="submit">
                    Add Row
                </button>
            </div>
        </form>
    );
};

export default AddRowFormLowerPart;
