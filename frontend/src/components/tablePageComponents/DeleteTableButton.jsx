import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteTableButton = () => {
    const { tableId } = useParams();

    const [dltTableClicked, setDltTableClicked] = useState(false);

    const [dltInputText, setDltInputText] = useState("");

    const handleDeleteButtonClick = () => {
        if (dltInputText !== "delete") {
            return toast.error("Wrong input");
        }
    };
    return (
        <div className="dlt-tbl-btn-container">
            <button
                className="table-nav-btn table-nav-dlt-btn"
                type="button"
                onClick={() => {
                    setDltTableClicked(true);
                }}
            >
                <span className="material-symbols-rounded">delete</span>
            </button>
            {dltTableClicked && (
                <div className="dlt-confirmation-popup">
                    <div className="popup-upper">
                        <span
                            onClick={() => {
                                setDltTableClicked(false);
                            }}
                            className="material-symbols-rounded"
                        >
                            close
                        </span>
                    </div>
                    <div className="popup-lower">
                        <h5 className="text">
                            Are you sure, you want to delete this table?
                        </h5>
                        <h4>
                            Please type <span>delete</span> below to delete
                        </h4>
                        <input
                            className="delete-input"
                            type="text"
                            value={dltInputText}
                            onChange={(e) => {
                                setDltInputText(e.target.value);
                            }}
                        />
                        <button
                            className="confirm-dlt-btn"
                            onClick={handleDeleteButtonClick}
                            type="button"
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteTableButton;
