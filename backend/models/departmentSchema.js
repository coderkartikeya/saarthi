import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String 
    },
    head: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor' // Reference to the Doctor who heads the department
    }
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
export default Department;
