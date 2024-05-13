import React from "react";
import { Link } from "react-router-dom";

const AddTableButton = () => {
    return (
        <Link className="table-count-container add-tbl" to={"/create-table"}>
            <h2 className="label">Create New Table</h2>
            <div className="table-count">
                <span className="material-symbols-rounded g-ico">
                    add_circle
                </span>
            </div>
        </Link>
    );
};

export default AddTableButton;
