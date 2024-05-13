import React from "react";
import { useSelector } from "react-redux";
import TableNameCapsule from "./TableNameCapsule";

const TablesData = () => {
    const { userProfileDetails } = useSelector((state) => state.userDataSlice);
    return (
        <div className="table-links-container">
            <h1>Your Tables</h1>
            <p>Click on table name to see</p>
            <div className="table-capsules">
                {userProfileDetails?.tables.map((singleTableData) => {
                    return (
                        <TableNameCapsule
                            key={singleTableData._id}
                            data={singleTableData}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TablesData;
