import React from "react";
import "../../../styles/tablePageStyles/updateRowContainer.css";
import UpdateRowFormLowerPart from "./UpdateRowFormLowerPart";

const UpdateRowContainer = ({ currentRowData, setShowUpdateRow }) => {
    return (
        <div>
            <div className="update-row-form-container">
                <div className="add-row-form-upper-part">
                    <h2>Update Row of id: {currentRowData.id}</h2>
                    <span
                        onClick={() => {
                            setShowUpdateRow(false);
                        }}
                        className="material-symbols-rounded add-row-form-close-btn"
                    >
                        close
                    </span>
                </div>
                <UpdateRowFormLowerPart
                    setShowUpdateRow={setShowUpdateRow}
                    currentRowData={currentRowData}
                />
            </div>
        </div>
    );
};

export default UpdateRowContainer;
