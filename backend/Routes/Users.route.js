import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";

// collection import
import User from "../models/userSchema.js";
import MedicalRecord from "../models/medicalRecordSchema.js";


// Signup route
router.post("/signup", async (req, res) => {
    const { fullname, email, password, gender, dateOfBirth, contact, address } = req.body;
    try {
        // Check if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            gender: gender,
            dateOfBirth: dateOfBirth,
            contact: contact,
            address: address,
           

        });

        await createdUser.save();

        res.status(201).json({
            message: "User created successfully!",
            user: {
                _id: createdUser._id,
                email: createdUser.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // finding user using email
        const user = await User.findOne({ email: email });

        // finding user using password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(201).json({
                message: "Login successfull",
                user: {
                    _id: user._id,
                    email: user.email
                }
            });
        };
    } catch (error) {
        console.log(error);
    };
});

// Get Patient Profile by ID
// Get Patient Profile by ID
router.get("/profile/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the patient by ID and populate medicalHistory
        const patient = await User.findById(id).populate('medicalHistory');

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});



// patient profile
// Update user details with default fields
router.put("/updatePatientProfile/:id", async (req, res) => {
    const { id } = req.params; // Get user ID from the route parameters
    const { dateOfBirth, gender, contact, address, medicalHistory } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare the update object
        const updateFields = {};
        if (dateOfBirth !== undefined) updateFields.dateOfBirth = dateOfBirth;
        if (gender !== undefined) updateFields.gender = gender;
        if (contact !== undefined) updateFields.contact = contact;
        if (address !== undefined) updateFields.address = address;
        if (medicalHistory !== undefined) updateFields.medicalHistory = medicalHistory;

        // Update the user document
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "User updated successfully!",
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// adding User's medical records
router.post("/medicalRecord", async (req, res) => {
    const { patient, doctor, date, diagnosis, prescription, hospital } = req.body;

    try {
        // Create a new medical record instance
        const newMedicalRecord = new MedicalRecord({
            patient,
            doctor,
            date: date || Date.now(), // Use provided date or default to now
            diagnosis,
            prescription,
            hospital: hospital// Use provided hospital or default to a space
        });

        // Save the medical record to the database
        const savedMedicalRecord = await newMedicalRecord.save();

        // Update the user's medicalHistory with the new medical record's ID
        await User.findByIdAndUpdate(patient, {
            $push: { medicalHistory: savedMedicalRecord._id }
        });

        res.status(201).json({
            message: "Medical Record Added",
            data: savedMedicalRecord
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }


})





export default router;