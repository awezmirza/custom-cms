// input type = [{name : "ColumnName", "type" : "ColumnType", required : "true/false", unique : "true/false"}]
// Ex: [{"name" : "Index", "type"}]
import { DataTypes } from "sequelize";

const generateModelColumns = (inputArray) => {

    const dataTypeMap = {
        "STRING": DataTypes.STRING,
        "INTEGER": DataTypes.INTEGER,
        "BOOLEAN": DataTypes.BOOLEAN,
        "DATE": DataTypes.DATE,
    }

    const modelColumns = {};
    inputArray.map((input) => {

        const name = input.name.replace(/[-\s]+/g, '_');

        modelColumns[name] = {
            type: dataTypeMap[input?.type] || DataTypes.STRING,
            allowNull: (!input?.required) || false,
            unique: input?.unique || false
        }
    });

    return modelColumns;
}

// const test = generateModelColumns([
//     { name: "Index", type: "String", allowNull: false, unique: true },
//     { name: "Title", type: "String", allowNull: false, unique: true  },
//     { name: "Publish Date", type: "Int", allowNull: true, unique: false  },
// ]);
// console.log("test: ", test);

export default generateModelColumns;