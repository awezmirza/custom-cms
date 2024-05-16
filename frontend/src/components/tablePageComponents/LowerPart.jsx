import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTableData } from "../../utils/fetchTableData";
import {
    fetchDataFailure,
    fetchDataStart,
    fetchDataSuccess
} from "../../config/tableDataSlice";

const LowerPart = () => {
    const dispatch = useDispatch();
    const { tableId } = useParams();
    // const { tableData, loading, error } = useSelector(
    //     (state) => state.tableDataSlice
    // );
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchDataStart());
            try {
                const tableData = await fetchTableData(tableId);
                dispatch(fetchDataSuccess(tableData));
            } catch (error) {
                dispatch(fetchDataFailure(error));
            }
        };

        fetchData();
    }, [tableId]);
    return <div className="table-page-lower-part-container">LowerPart</div>;
};

export default LowerPart;
