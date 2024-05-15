import React, { useEffect, useState } from "react";
import Shimmer from "../Shimmer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_SERVICE_URL } from "../../utils/constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TableNameContainer = () => {
    const [tableName, setTableName] = useState(undefined);
    const [tableNameLoading, setTableNameLoading] = useState(true);

    const [editTableName, setEditTableName] = useState(false);

    const [edittedTableName, setEdittedTableName] = useState(tableName);

    const { tableId } = useParams();

    const { accessToken } = useSelector((state) => state.userDataSlice);

    useEffect(() => {
        const fetchTableName = async (tableId) => {
            try {
                const serverRes = await axios.get(
                    USER_SERVICE_URL + "/get-table-name/" + tableId,
                    {
                        headers: {
                            "access-token": accessToken
                        }
                    }
                );
                setTableName(serverRes.data.data.tableName);
                setTableNameLoading(false);
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "Something went wrong"
                );
            }
        };
        fetchTableName(tableId);
    }, [tableId]);

    const changeTableName = async () => {
        if (edittedTableName === "") {
            toast.error("Table name can't be empty");
        } else if (edittedTableName !== tableName && edittedTableName) {
            try {
                await toast.promise(
                    axios.patch(
                        USER_SERVICE_URL + "/edit-table-name/" + tableId + "a",
                        {
                            tableName: edittedTableName
                        },
                        {
                            headers: {
                                "access-token": accessToken
                            }
                        }
                    ),
                    {
                        pending: "Updating name..."
                    }
                );
                toast.success("Table name updated successfully");
                setTableName(edittedTableName);
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "Something went wrong"
                );
            }
        }
        setEdittedTableName(tableName);
        setEditTableName(false);
    };

    return (
        <>
            {tableNameLoading ? (
                <Shimmer styleClass={"table-name-shimmer-width"} />
            ) : editTableName ? (
                <>
                    <input
                        className="edit-table-input-box"
                        value={
                            edittedTableName == null
                                ? tableName
                                : edittedTableName
                        }
                        onChange={(e) => {
                            setEdittedTableName(e.target.value);
                        }}
                    />
                    <button
                        className="edit-table-btns edit-save-btn"
                        type="button"
                        onClick={changeTableName}
                    >
                        <span className="material-symbols-rounded">save</span>
                    </button>
                    <button
                        className="edit-table-btns edit-close-btn"
                        type="button"
                        onClick={() => {
                            setEditTableName(!editTableName);
                        }}
                    >
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </>
            ) : (
                <>
                    <h1
                        className="table-name"
                        onClick={() => {
                            setEditTableName(!editTableName);
                        }}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                    >
                        {tableName}
                    </h1>
                </>
            )}
        </>
    );
};

export default TableNameContainer;
