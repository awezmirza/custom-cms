import React from "react";
import { useSelector } from "react-redux";
import Shimmer from "../../Shimmer";
import TableData from "./TableData";

const TableDataContainer = () => {
    const { tableDataLoading, tableDataError } = useSelector(
        (state) => state.tableDataSlice
    );

    if (tableDataError) {
        return <div className="table-data-error">Error: {tableDataError}</div>;
    }
    return (
        <div className="table-page-lower-part-container">
            {tableDataLoading ? (
                <Shimmer styleClass={"table-page-lower-part-shimmer"} />
            ) : (
                <TableData />
            )}
        </div>
    );
};

export default TableDataContainer;
