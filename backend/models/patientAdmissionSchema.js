import mongoose from "mongoose";

const patientAdmissionSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', 
        required: true 
    },
    admissionDate: { 
        type: Date, 
        default: Date.now 
    },
    dischargeDate: { 
        type: Date 
    },
    bedNumber: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['Admitted', 'Discharged', 'Pending'], 
        default: 'Pending' 
    },
    hospitalId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hospital',
        required: true // Required for tracking which hospital the admission belongs to
    }
}, { timestamps: true });

const PatientAdmission = mongoose.model('PatientAdmission', patientAdmissionSchema);
export default PatientAdmission;
