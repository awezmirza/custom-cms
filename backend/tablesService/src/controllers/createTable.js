import { customError } from "../errors/errorUtils/index.js";

const createTable = async (req, res) => {
    // Get the received table id
    // Create table with the received table Id and fields
    
    // Validate Inputs
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "User not logged in");
    }
    const data = req.body?.formData
    if (!data?.tableName) {
        throw new customError(400, "Table name is required");
    }
    if (!data?.fields || data?.fields.length == 0) {
        throw new customError(400, "At least one field is required");
    }
    for (let i = 0; i < data.fields.length; i++) {
        const field = data.fields[i];
        if (!field.name) {
            throw new customError(400, "Field name can't be empty");
        }
    }
    
    // Send add table request with access token and table name to user service
    


    return res.status(201).json({
        message: "Table Created Successfully",
        success: true
    });
}

export default createTable;