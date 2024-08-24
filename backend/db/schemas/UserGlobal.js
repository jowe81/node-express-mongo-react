import { Schema } from "mongoose";

// Define your model schemas here
const UserGlobal = new Schema(
    {
        accountType: {
            type: String,
        },        
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userDbName: {

        },
        userRecordId: {
            
        }
    },
    {
        timestamps: true,
    }
);

export default UserGlobal