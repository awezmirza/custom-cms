import React from "react";

const StringInput = ({ data, fields, setFields, name }) => {
    return (
        <input
            placeholder="Enter Text"
            className="create-table-field"
            name={name}
            value={data || ""}
            onChange={(e) => setFields({ ...fields, [name]: e.target.value })}
        />
    );
};

export default StringInput;
