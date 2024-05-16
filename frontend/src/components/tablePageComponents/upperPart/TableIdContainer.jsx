import React from "react";
import { useParams } from "react-router-dom";

const TableIdContainer = () => {
    const { tableId } = useParams();
    return <h4 className="table-id">Table Id: {tableId}</h4>;
};

export default TableIdContainer;
