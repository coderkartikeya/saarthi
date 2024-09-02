import express from "express";
const router = express.Router();

import Hospital from '../models/hospitalSchema.js';
import Doctor from '../models/doctorSchema.js';
import BedAvailability from "../models/bedAvailabilitySchema.js";

// adding hospitals
router.post("/hospitals", async (req, res) => {
    try {
        const { name, address, patientAdmissions, totalDoctors, totalBeds, availableBeds } = req.body;
        // creating a new hospital
        const newHospital = new Hospital({
            name: name,
            address: address,
            patientAdmissions: patientAdmissions,
            totalDoctors: totalDoctors,
            totalBeds: totalBeds,
            availableBeds: availableBeds

        });

        const savedHospital = newHospital.save();

        res.status(201).json({
            message: "Hospital added successfully",
            hospital: {
                name: newHospital.name,
                address: newHospital.address
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// getting all the hospitals from the database
router.get("/hospitals", async (req, res) => {
    try {
        // finding all the hospitals from collection
        const Hospitals = await Hospital.find();
        res.status(200).json(Hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

});

// getting specific hospitals by their id
router.get("/hospitals/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const hospital = await Hospital.findById(id);

        // if hospital is not found
        if (!hospital) {
            return res.status(404).json({ message: "hospital not found" });
        }
        res.status(200).json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});

// adding doctor
router.post("/doctor", async (req, res) => {
    try {
        const {
            user,
            name,
            role,
            contactNumber,
            department,
            availability,
            hospitalId
        } = req.body;

        // creating a new doctor
        const newDoctor = new Doctor({
            user: user,
            name: name,
            role: role,
            contactNumber: contactNumber,
            department: department,
            availability: availability || [],
            hospitalId: hospitalId || undefined
        });

        const savedDoctor = await newDoctor.save();

        res.status(201).json({
            message: "Doctor added successfully",
            doctor: {
                name: newDoctor.name,
                role: newDoctor.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

// getting doctor
router.get("/doctor", async (req, res) => {
    try {
        const { name } = req.query;
        // if name not provided in search
        if (!name) {
            return res.status(400).json({ message: "Name parameter is req" });
        }

        // finding doctors with provided name(case-insensitive search)
        const doctors = await Doctor.find({ name: new RegExp(name, 'i') });
        // if doctor not found
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctor found with that name" })
        }

        res.status(200).json(doctors);





    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// adding bedavaialbility details of different hospitals
router.post('/bedavailability', async (req, res) => {
    try {
        // Extract data from the request body
        const { department, category, totalBeds, availableBeds, hospitalId } = req.body;

        // Create a new BedAvailability document
        const newBedAvailability = new BedAvailability({
            department,
            category,
            totalBeds,
            availableBeds,
            hospitalId
        });

        // Save the new document to the database
        await newBedAvailability.save();

        // Send a response with the created document
        res.status(201).json({
            message: 'Bed availability created successfully',
            data: newBedAvailability
        });
    } catch (error) {
        console.error('Error creating bed availability:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// getting bed availability details
router.get('/bedavailability', async (req, res) => {
    try {
        // Fetch bed availability data, populated with hospital information
        const bedAvailabilities = await BedAvailability.find().populate('hospitalId', 'name address');

        // Group data by hospital
        const groupedByHospital = bedAvailabilities.reduce((acc, availability) => {
            const hospitalId = availability.hospitalId._id;

            // If the hospital doesn't exist in the accumulator, add it
            if (!acc[hospitalId]) {
                acc[hospitalId] = {
                    hospital: availability.hospitalId, // store hospital details
                    categories: {}
                };
            }

            // If the category doesn't exist for the hospital, add it
            if (!acc[hospitalId].categories[availability.category]) {
                acc[hospitalId].categories[availability.category] = [];
            }

            // Push the availability data into the correct category
            acc[hospitalId].categories[availability.category].push({
                department: availability.department,
                totalBeds: availability.totalBeds,
                availableBeds: availability.availableBeds,
                lastUpdated: availability.lastUpdated
            });

            return acc;
        }, {});

        // Convert the grouped data object into an array for easier consumption
        const result = Object.values(groupedByHospital);

        res.json(result);
    } catch (error) {
        console.error('Error fetching bed availability:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// updating bed availability details
router.put('/bedavailability/:id', async (req, res) => {
    const id = req.params.id;
    // updating required fields
    const { department, category, totalBeds, availableBeds } = req.body;

    try {
        // updating the bedavailabilitites for a specific hospital
        const updatedBedAvailability = await BedAvailability.findByIdAndUpdate(id, {
            department,
            category,
            totalBeds,
            availableBeds
        },
            { new: true, runValidators: true }
        );

        if (!updatedBedAvailability) {
            return res.status(404).json({ message: "Bed availability not found" });

        }

        res.status(200).json({
            message: "Updated the availabilities",
            data: updatedBedAvailability
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



export default router;