import mongoose from "mongoose";

// Medical Record Schema
const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: false,
        default: " "
    }
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
