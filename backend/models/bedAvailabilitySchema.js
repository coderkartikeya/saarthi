import mongoose from "mongoose";

const bedAvailabilitySchema = new mongoose.Schema({
    department: { 
        type: String, 
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
    },
    hospitalId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hospital',
        required: true // Required to identify the hospital where the beds are available
    }
}, { timestamps: true });

const BedAvailability = mongoose.model('BedAvailability', bedAvailabilitySchema);
export default BedAvailability;
