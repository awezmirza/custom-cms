import React from "react";
import TableCount from "./TableCount";
import { useSelector } from "react-redux";
import TablesData from "./TablesData";
import AddTableButton from "./AddTableButton";

const TableDataContainer = () => {
    const { userProfileDetails } = useSelector((state) => state.userDataSlice);
    return (
        <div className="table-data-container">
            <div className="left-side">
                <TableCount />
                <AddTableButton />
            </div>
            {userProfileDetails?.tables.length ? <TablesData /> : <></>}
        </div>
    );
};

export default TableDataContainer;
