import UserGlobal from "./schemas/UserGlobal.js";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define your model schemas here
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Add more schemas here as needed
const modelRegistry = {
    backend: {
        UserGlobal,
        User: userSchema,
    },
    standalone: {

    },
    tenant: {

    },    
};

export default modelRegistry;
