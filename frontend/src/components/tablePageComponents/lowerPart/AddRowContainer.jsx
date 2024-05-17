import { useState } from "react";
import AddRowFormLowerPart from "./AddRowFormLowerPart";
import { useSelector } from "react-redux";
import Shimmer from "../../Shimmer";

const AddRowContainer = () => {
    const { tableColumnData } = useSelector((state) => state.tableDataSlice);
    const [showAddRow, setShowAddRow] = useState(false);
    return (
        <div className="add-row-parent">
            <h2
                className="add-row-container"
                onClick={() => {
                    if (tableColumnData) {
                        setShowAddRow(true);
                    }
                }}
            >
                {tableColumnData ? <>Click to add row</> : <Shimmer />}
            </h2>
            {showAddRow && (
                <div className="add-row-form-container">
                    <div className="add-row-form-upper-part">
                        <h2>Add Row</h2>
                        <span
                            onClick={() => {
                                setShowAddRow(false);
                            }}
                            className="material-symbols-rounded add-row-form-close-btn"
                        >
                            close
                        </span>
                    </div>
                    <AddRowFormLowerPart setShowAddRow={setShowAddRow} />
                </div>
            )}
        </div>
    );
};

export default AddRowContainer;
