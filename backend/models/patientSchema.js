import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true 
    },
    contactNumber: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    medicalHistory: { 
        type: String 
    },
    admissionDate: { 
        type: Date, 
        default: Date.now 
    },
    dischargeDate: { 
        type: Date 
    },
    assignedDoctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
