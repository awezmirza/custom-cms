import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTableData } from "../../../utils/fetchTableData";
import {
    fetchDataFailure,
    fetchDataStart,
    fetchDataSuccess
} from "../../../config/tableDataSlice";
import "../../../styles/tablePageStyles/lowerPart.css";
import TableDataContainer from "./TableDataContainer";
import AddRowContainer from "./AddRowContainer";

const LowerPart = () => {
    const dispatch = useDispatch();
    const { tableId } = useParams();
    const { accessToken } = useSelector((state) => state.userDataSlice);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchDataStart());
            try {
                const tableData = await fetchTableData(tableId, accessToken);
                dispatch(fetchDataSuccess(tableData));
            } catch (error) {
                dispatch(fetchDataFailure(error));
            }
        };

        fetchData();
    }, [tableId]);
    return (
        <>
            <TableDataContainer />
            <AddRowContainer />
        </>
    );
};

export default LowerPart;
