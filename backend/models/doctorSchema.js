import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    specialization: { 
        type: String, 
        required: true 
    },

    contactNumber: { 
        type: String, 
        required: true 
    },

    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department'
    },
    
    availability: [{
        day: { 
            type: String, 
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true 
        },
        startTime: { 
            type: String,
            required: true 
        },
        endTime: { 
            type: String,
            required: true 
        }
    }]
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
