import mongoose from "mongoose";

const bedAvailabilitySchema = new mongoose.Schema({
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['ICU', 'General Ward', 'Semi-Private', 'Private', 'Other'], 
        required: true 
    },
    totalBeds: { 
        type: Number, 
        required: true 
    },
    availableBeds: { 
        type: Number, 
        required: true 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

const BedAvailability = mongoose.model('BedAvailability', bedAvailabilitySchema);
export default BedAvailability;
