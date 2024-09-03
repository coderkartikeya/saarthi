import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: undefined
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: false,
        default: ""
    },
    department: {
        type: String,
        required: true,
    },
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: false,
            default: ""
        },
        startTime: {
            type: String,
            required: false,
            default: ""
        },
        endTime: {
            type: String,
            required: false,
            default: ""
        }
    }],
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false,

    }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
