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

const useHandleAddRowSubmit = (setShowAddRow) => {
    const [fields, setFields] = useState({});
    const { tableColumnData } = useSelector((state) => state.tableDataSlice);

    const { tableId } = useParams();
    const { accessToken } = useSelector((state) => state.userDataSlice);

    const dispatch = useDispatch();

    const handleAddRowSubmit = async (event) => {
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
                    TABLES_SERVICE_URL + "/add-row/" + tableId,
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
                    pending: "Adding Row..."
                }
            );
            toast.success("Row added successfully");

            setShowAddRow(false);

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

    return { handleAddRowSubmit, fields, setFields, tableColumnData };
};

export default useHandleAddRowSubmit;
