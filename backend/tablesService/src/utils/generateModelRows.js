import { customError } from "../errors/errorUtils/index.js";

const generateModelRows = (rowData, tableColumns) => {
    const columnName = [];
    let valuesString = "";

    tableColumns.map((column) => {
        if (column.COLUMN_NAME != "id") {
            if (rowData[column.COLUMN_NAME] != undefined) {
                columnName.push("`" + column.COLUMN_NAME + "`");

                if (column.DATA_TYPE == "tinyint") {
                    const boolVal = Boolean(rowData[column.COLUMN_NAME]);
                    valuesString += `${boolVal}, `;
                } else if (column.DATA_TYPE == "datetime") {
                    valuesString += `'${rowData[column.COLUMN_NAME]}', `;
                } else if (column.DATA_TYPE == "varchar") {
                    valuesString += `'${rowData[column.COLUMN_NAME]}', `;
                } else {
                    valuesString += `${rowData[column.COLUMN_NAME]}, `;
                }
            } else {
                if (column.IS_NULLABLE == "NO") {
                    throw new customError(
                        400,
                        column.COLUMN_NAME + " cannot be empty"
                    );
                }
            }
        }
    });

    if (columnName.length == 0) {
        throw new customError(400, " At least one field is required");
    }

    valuesString = valuesString.slice(0, -2);

    const columnNameString = columnName.join(", ");

    return { columnNameString, valuesString };
};

export default generateModelRows;
