import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // 'User' means its paitent
        required: true 
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true 
    },
    dateTime: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Scheduled', 'Completed', 'Cancelled'], 
        default: 'Scheduled' 
    },
    reason: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    hospitalName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
