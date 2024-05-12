import React from "react";
import TableCount from "./TableCount";
import { useSelector } from "react-redux";
import TablesData from "./TablesData";

const TableDataContainer = () => {
    const { userProfileDetails } = useSelector((state) => state.userDataSlice);
    return (
        <div className="table-data-container">
            <TableCount />
            {userProfileDetails?.tables.length ? <TablesData /> : <></>}
        </div>
    );
};

export default TableDataContainer;
