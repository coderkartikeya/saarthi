import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    dateOfBirth: {
        type: Date,
        default: null // Default value if not provided
    },
    gender: {
        type: String,
        default: "" // Default value if not provided
    },
    contact: {
        type: String,
        unique: true,
        default: "", // Default value is undefined
    },
    address: {
        type: String,
        default: "" // Default value if not provided
    },
    medicalHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord',
        default: [] // Default value if not provided
    }]

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
