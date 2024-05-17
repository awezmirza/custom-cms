import React from "react";

const DateInput = ({ data, fields, setFields, name }) => {
    return (
        <input
            placeholder="DD/MM/YYYY"
            className="create-table-field"
            name={name}
            value={data || ""}
            onChange={(e) => setFields({ ...fields, [name]: e.target.value })}
        />
    );
};

export default DateInput;
