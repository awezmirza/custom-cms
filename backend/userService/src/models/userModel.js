import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        password: {
            type: String
        },
        avatar: {
            type: String
        },
        tables: {
            type: [
                {
                    tableName: String,
                    tableId: String
                }
            ],
            default: []
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
