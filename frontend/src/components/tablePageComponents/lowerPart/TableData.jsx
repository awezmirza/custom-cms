import { useDispatch, useSelector } from "react-redux";
import "../../../styles/tablePageStyles/tableData.css";
import { useState } from "react";
import { TABLES_SERVICE_URL } from "../../../utils/constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    fetchDataFailure,
    fetchDataStart,
    fetchDataSuccess
} from "../../../config/tableDataSlice";
import { fetchTableData } from "../../../utils/fetchTableData";
import UpdateRowForm from "./UpdateRowContainer";

const TableData = () => {
    const { tableData, tableColumnData } = useSelector(
        (state) => state.tableDataSlice
    );

    const { accessToken } = useSelector((state) => state.userDataSlice);

    const [showDeleteRowPopup, setShowDeleteRowPopup] = useState(false);

    const [showUpdateRow, setShowUpdateRow] = useState(false);
    const [rowToUpdate, setRowToUpdate] = useState(null);

    const { tableId } = useParams();

    const deleteRowClicked = (rowId) => {
        setDltRow(rowId);
        setShowDeleteRowPopup(true);
    };

    const updateRowClicked = (rowIndex) => {
        setRowToUpdate(rowIndex);
        setShowUpdateRow(true);
    };

    const dispatch = useDispatch();

    const [dltRow, setDltRow] = useState(null);

    const handleRowDelete = async () => {
        try {
            await toast.promise(
                axios.delete(
                    `${TABLES_SERVICE_URL}/delete-row/${tableId}?rowId=${dltRow}`,
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
            toast.success("Row deleted successfully");
            dispatch(fetchDataStart());
            try {
                const tableData = await fetchTableData(tableId, accessToken);
                dispatch(fetchDataSuccess(tableData));
            } catch (error) {
                dispatch(fetchDataFailure(error));
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };

    if (showUpdateRow) {
        return (
            <UpdateRowForm
                currentRowData={tableData[rowToUpdate]}
                setShowUpdateRow={setShowUpdateRow}
            />
        );
    }

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
                    {tableData.map((row, rowIndex) => {
                        return (
                            <tr key={row.id}>
                                <td className="action-btn-container">
                                    <span
                                        className="material-symbols-rounded col-edit-btn"
                                        onClick={() => {
                                            updateRowClicked(rowIndex);
                                        }}
                                    >
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
                                {tableColumnData.map((column, columnIndex) => {
                                    let cellValue;
                                    if (column.DATA_TYPE === "datetime") {
                                        if (row[column.COLUMN_NAME]) {
                                            const date = new Date(
                                                row[column.COLUMN_NAME]
                                            );
                                            const day = String(
                                                date.getDate()
                                            ).padStart(2, "0");
                                            const month = String(
                                                date.getMonth() + 1
                                            ).padStart(2, "0");
                                            const year = date.getFullYear();
                                            cellValue = `${day}/${month}/${year}`;
                                        }
                                    } else {
                                        cellValue = row[column.COLUMN_NAME];
                                    }

                                    return (
                                        <td
                                            key={
                                                row[column.COLUMN_NAME] +
                                                String(rowIndex) +
                                                String(columnIndex)
                                            }
                                        >
                                            {cellValue}
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
