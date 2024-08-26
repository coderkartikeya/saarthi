import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    totalDoctors: {
        type: Number,
        default: 0
    },
    totalBeds: {
        type: Number,
        required: true
    },
    availableBeds: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
