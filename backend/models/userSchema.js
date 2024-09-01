import mongoose from "mongoose";


const medicalHistorySchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        required: true
    },
    dischargeDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        default: ""
    }
}, { _id: false }); 

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
        default: null
    },
    gender: {
        type: String,
        default: ""
    },
    contact: {
        type: Number,
        default: null
    },
    address: {
        type: String,
        default: ""
    },
    medicalHistory: {
        type: [medicalHistorySchema], 
        default: [] 
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
