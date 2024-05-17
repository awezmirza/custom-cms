const typeOptions = [
    { value: "STRING", label: "String" },
    { value: "INTEGER", label: "Integer" },
    { value: "BOOLEAN", label: "Boolean" },
    { value: "DATE", label: "Date" }
];
const trueFalseOptions = [
    { value: true, label: "True" },
    { value: false, label: "False" }
];

const selectStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "rgba(103, 103, 103, 0.625)",
        color: "white",
        borderRadius: "20px"
    }),
    input: (provided) => ({
        ...provided,
        color: "white"
    }),
    menu: (provided) => ({ ...provided, backgroundColor: "#1e1f20" }),
    menuList: (provided) => ({
        ...provided,
        color: "red",
        border: "1px solid rgb(118, 118, 118)",
        borderRadius: "15px",
        padding: "0px"
    }),
    option: (provided, state) => ({
        ...provided,
        color: "white",
        backgroundColor: state.isSelected
            ? "black"
            : state.isFocused
              ? "#131314"
              : "none"
    }),
    singleValue: (provided) => ({ ...provided, color: "white" }),
    placeholder: (provided) => ({ ...provided, color: "rgb(182, 182, 182)" }),
    valueContainer: (provided) => ({ ...provided, paddingInline: "15px" })
};

export { typeOptions, trueFalseOptions, selectStyles };
