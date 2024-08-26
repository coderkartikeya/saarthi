import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
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
        type: String 
    },
    notes: { 
        type: String 
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true // Required to track the hospital where the record was created
    }
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
