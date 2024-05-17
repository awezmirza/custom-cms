import { useState } from "react";
import { toast } from "react-toastify";
import convertDateString from "../../../utils/authFunctionsAndHooks/validators/convertDateString";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TABLES_SERVICE_URL } from "../../../utils/constant";
import { useParams } from "react-router-dom";
import {
    fetchDataFailure,
    fetchDataStart,
    fetchDataSuccess
} from "../../../config/tableDataSlice";
import { fetchTableData } from "../../../utils/fetchTableData";

const useHandleUpdateRowSubmit = (setShowUpdateRow, currentRowData) => {
    const { tableColumnData } = useSelector((state) => state.tableDataSlice);

    const updatedRowData = { ...currentRowData };

    tableColumnData.map((column) => {
        if (
            column.DATA_TYPE === "datetime" &&
            updatedRowData[column.COLUMN_NAME] !== null
        ) {
            const thisDate = updatedRowData[column.COLUMN_NAME];
            const date = new Date(thisDate);

            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            updatedRowData[column.COLUMN_NAME] = formattedDate;
        } else if (
            column.DATA_TYPE === "tinyint" &&
            updatedRowData[column.COLUMN_NAME] !== null
        ) {
            if (updatedRowData[column.COLUMN_NAME] === 1) {
                updatedRowData[column.COLUMN_NAME] = {
                    value: true,
                    label: "True"
                };
            } else {
                updatedRowData[column.COLUMN_NAME] = {
                    value: false,
                    label: "False"
                };
            }
        }
    });
    const [fields, setFields] = useState(updatedRowData);

    const { tableId } = useParams();
    const { accessToken } = useSelector((state) => state.userDataSlice);

    const dispatch = useDispatch();

    const handleUpdateRowSubmit = async (event) => {
        try {
            event.preventDefault();
            const requestBody = {};
            let broke = 0;
            tableColumnData.map((data) => {
                if (data?.COLUMN_NAME !== "id" && !broke) {
                    if (fields[data.COLUMN_NAME]) {
                        if (data.DATA_TYPE === "tinyint") {
                            requestBody[data.COLUMN_NAME] =
                                fields[data.COLUMN_NAME].value;
                        } else if (data.DATA_TYPE === "datetime") {
                            const dateObject = convertDateString(
                                fields[data.COLUMN_NAME]
                            );
                            if (dateObject === "Invalid Date") {
                                broke = 1;
                                return toast.error(
                                    data.COLUMN_NAME + " is Invalid Date"
                                );
                            }

                            const year = dateObject.getFullYear();
                            const month = String(
                                dateObject.getMonth() + 1
                            ).padStart(2, "0"); // Months are 0-based, so add 1
                            const day = String(dateObject.getDate()).padStart(
                                2,
                                "0"
                            ); // Day of the month

                            const formattedDate = `${year}-${month}-${day}`;

                            requestBody[data.COLUMN_NAME] = formattedDate;
                        } else {
                            requestBody[data.COLUMN_NAME] =
                                fields[data.COLUMN_NAME];
                        }
                    } else {
                        if (data.IS_NULLABLE === "NO") {
                            broke = 1;
                            return toast.error(
                                data.COLUMN_NAME + " is required"
                            );
                        }
                    }
                }
            });
            if (broke) return;

            await toast.promise(
                axios.patch(
                    TABLES_SERVICE_URL +
                        "/update-row/" +
                        tableId +
                        "?rowId=" +
                        updatedRowData.id,
                    {
                        rowData: requestBody
                    },
                    {
                        headers: {
                            "access-token": accessToken
                        }
                    }
                ),
                {
                    pending: "Updating Row..."
                }
            );
            toast.success("Row updated successfully");

            setShowUpdateRow(false);

            dispatch(fetchDataStart());
            try {
                const tableData = await fetchTableData(tableId, accessToken);
                dispatch(fetchDataSuccess(tableData));
            } catch (error) {
                dispatch(fetchDataFailure(error));
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };

    return { handleUpdateRowSubmit, fields, setFields, tableColumnData };
};

export default useHandleUpdateRowSubmit;
