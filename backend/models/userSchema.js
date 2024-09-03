import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        unique: true, 
        default: "" 
    },
    address: {
        type: String,
        default: "",
    },
    medicalHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord',
        default: [] // Default value if not provided
    }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
