const IntegerInput = ({ data, fields, setFields, name }) => {
    return (
        <input
            placeholder="Enter Number"
            className="create-table-field"
            name={name}
            value={data || ""}
            type="number"
            onChange={(e) => setFields({ ...fields, [name]: e.target.value })}
        />
    );
};

export default IntegerInput;
