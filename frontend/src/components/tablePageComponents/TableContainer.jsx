import React from "react";
import UpperPart from "./upperPart/UpperPart";
import LowerPart from "./lowerPart/LowerPart";

const TableContainer = () => {
    return (
        <div className="table-container">
            <UpperPart />
            <h6 className="table-name-edit-tip">Click on table name to edit</h6>
            <LowerPart />
        </div>
    );
};

export default TableContainer;
