import { useSelector } from "react-redux";
import "../../../styles/tablePageStyles/tableData.css";
import { useState } from "react";

const TableData = () => {
    const { tableData, tableColumnData } = useSelector(
        (state) => state.tableDataSlice
    );

    const [showDeleteRowPopup, setShowDeleteRowPopup] = useState(false);

    const deleteRowClicked = (rowId) => {
        setDltRow(rowId);
        setShowDeleteRowPopup(true);
    };

    const [dltRow, setDltRow] = useState(null);
    
    const handleRowDelete = () => {
        console.log("Deleting row with id: " + dltRow);
    };

    return (
        <div className="main-tbl-container">
            {showDeleteRowPopup && (
                <span className="col-delete-confirmation-popup">
                    <div className="waring-text">
                        <span className="material-symbols-rounded warning-icon">
                            warning
                        </span>
                        Are you sure, you want to delete row with id&nbsp;
                        <b>{dltRow}</b>&nbsp;?
                    </div>
                    <div>
                        <button
                            type="button"
                            className="yes-btn"
                            onClick={handleRowDelete}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="no-btn"
                            onClick={() => {
                                setShowDeleteRowPopup(false);
                            }}
                        >
                            No
                        </button>
                    </div>
                </span>
            )}
            <table className="main-table">
                <thead>
                    <tr className="main-tbl-column">
                        <th className="action-column">Actions</th>
                        {tableColumnData.map((column) => {
                            return (
                                <th key={column.COLUMN_NAME}>
                                    {column.COLUMN_NAME}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => {
                        return (
                            <tr key={row.id}>
                                <td className="action-btn-container">
                                    <span className="material-symbols-rounded col-edit-btn">
                                        edit
                                    </span>
                                    <span
                                        className="material-symbols-rounded col-dlt-btn"
                                        onClick={() => {
                                            deleteRowClicked(row.id);
                                        }}
                                    >
                                        delete
                                    </span>
                                </td>
                                {tableColumnData.map((column) => {
                                    return (
                                        <td key={row[column.COLUMN_NAME]}>
                                            {row[column.COLUMN_NAME]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
