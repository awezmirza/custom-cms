// input type = [{name : "ColumnName", "type" : "ColumnType", "required" : "true/false"}]
// Ex: [{"name" : "Index", "type"}]

const generateModelColumns = (inputArray) => {
    const modelColumns = {};
    inputArray.map((input) => {

        const name = input.name.replace(/[-\s]+/g, '_');

        modelColumns[name] = {
            type: input?.type || STRING,
            allowNull: input?.allowNull || false
        }
    });
    return modelColumns;
}

// const test = generateModelColumns([
//     { name: "Index", type: "STRING", allowNull: false },
//     { name: "Title", type: "STRING", allowNull: false },
//     { name: "Publish Date", type: "INTEGER", allowNull: true },
// ]);
// console.log(test);

export default generateModelColumns;