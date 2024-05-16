import DeleteTableButton from "./DeleteTableButton";

const TableButtonsContainer = () => {
    return (
        <>
            <DeleteTableButton />
            <button className="table-nav-btn table-nav-code-btn" type="button">
                <span className="material-symbols-rounded">code</span>
            </button>
        </>
    );
};

export default TableButtonsContainer;
