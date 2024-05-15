import { customError } from "../errors/errorUtils/index.js";
import User from "../models/userModel.js";

class UserRepository {
    async create(data) {
        const user = await User.create(data);
        return user;
    }

    async update(specifierData, dataToUpdate) {
        const user = await User.findOneAndUpdate(specifierData, dataToUpdate, {
            new: true
        });
        return user;
    }

    async delete(id) {
        const user = await User.findByIdAndDelete(id);
        return user;
    }

    async getOneByData(data, getFields = "") {
        const user = await User.findOne(data, getFields);
        return user;
    }

    async addTable(userId, tableData) {
        // Get users object by user Id 
        const user = await User.findById(userId);
        if (!user) {
            throw new customError(400, "No user found");
        }
        // Push the {tableName, tableId} to user's tables array
        const { tableName, tableId } = tableData;
        user.tables.push({
            tableName, tableId
        })
        await user.save();
    }

    async editTableName(userId, tableId, newTableName) {
        const userData = await this.getOneByData({ _id: userId }, "");
        let found = 0;
        for (let i = 0; i < userData.tables.length; i++) {
            if (userData.tables[i].tableId === tableId) {
                userData.tables[i].tableName = newTableName;
                found = 1;
                break;
            }
        }
        if (found == 0) {
            throw new customError(400, "No table found");
        }
        await userData.save();
    }
}

export default UserRepository;
