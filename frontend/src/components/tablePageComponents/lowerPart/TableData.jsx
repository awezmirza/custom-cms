import { useSelector } from "react-redux";
import "../../../styles/tablePageStyles/tableData.css";

const TableData = () => {
    const { tableData, tableColumnData } = useSelector(
        (state) => state.tableDataSlice
    );

    return (
        <div className="main-tbl-container">
            <table className="main-table">
                <thead>
                    <tr className="main-tbl-column">
                        <th className="action-column">Actions</th>
                        {tableColumnData.map((column) => {
                            return (
                                <>
                                    <th key={column.COLUMN_NAME}>
                                        {column.COLUMN_NAME}
                                    </th>
                                </>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => {
                        return (
                            <>
                                <tr key={row.id}>
                                    <td className="action-btn-container">
                                        <span className="material-symbols-rounded col-edit-btn">
                                            edit
                                        </span>
                                        <span className="material-symbols-rounded col-dlt-btn">
                                            delete
                                        </span>
                                    </td>
                                    {tableColumnData.map((column) => {
                                        return (
                                            <td key={row[column.COLUMN_NAME]}>
                                                {row[column.COLUMN_NAME]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
