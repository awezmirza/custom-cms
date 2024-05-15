import React from "react";

const TableButtonsContainer = () => {
    return (
        <>
            <button className="table-nav-btn table-nav-dlt-btn" type="button">
                <span className="material-symbols-rounded">delete</span>
            </button>
            <button className="table-nav-btn table-nav-code-btn" type="button">
                <span className="material-symbols-rounded">code</span>
            </button>
        </>
    );
};

export default TableButtonsContainer;
