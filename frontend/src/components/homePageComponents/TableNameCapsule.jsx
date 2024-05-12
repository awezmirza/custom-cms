import React from "react";
import { Link } from "react-router-dom";

const TableNameCapsule = ({ data }) => {
    const { tableName, tableId } = data;
    return <Link to={"table/" + tableId}>{tableName}</Link>;
};

export default TableNameCapsule;
