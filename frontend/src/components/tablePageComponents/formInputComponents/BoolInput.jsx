import Select from "react-select";
import {
    selectStyles,
    trueFalseOptions
} from "../../createTableComponents/selectOptions";

const BoolInput = ({ data, fields, setFields, name }) => {
    return (
        <div className="add-row-select-container">
            <Select
                styles={selectStyles}
                value={data}
                onChange={(value) => setFields({ ...fields, [name]: value })}
                name={name}
                options={trueFalseOptions}
            />
        </div>
    );
};

export default BoolInput;
