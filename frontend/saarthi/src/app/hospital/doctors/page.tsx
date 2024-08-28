'use client'
import React, { useState } from 'react';
import { FaUserMd, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import SideNavHospital from '@/app/components/SideNavHospital';
import DoctorSearch from '@/app/components/DoctorSearch';

// Sample initial data
const initialDoctors = [
  { id: 1, name: 'Dr. John Doe', department: 'Cardiology', role: 'Head of Department' },
  { id: 2, name: 'Dr. Jane Smith', department: 'Neurology', role: 'Doctor' },
  { id: 3, name: 'Dr. Robert Brown', department: 'Pediatrics', role: 'Doctor' },
  { id: 4, name: 'Dr. Emily White', department: 'Orthopedics', role: 'Head of Department' },
];

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [newDoctor, setNewDoctor] = useState({ name: '', department: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Handler to add a new doctor
  const handleAddDoctor = async () => {
    if (newDoctor.name && newDoctor.department && newDoctor.role) {
      const newId = doctors.length ? Math.max(doctors.map(d => d.id)) + 1 : 1;
      const addedDoctor = { id: newId, ...newDoctor };

      // Simulate a successful API call
      setDoctors([...doctors, addedDoctor]);
      setNewDoctor({ name: '', department: '', role: '' });
      alert('Doctor added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handler to edit doctor details
  const handleEditDoctor = (id) => {
    alert(`Edit Doctor functionality for doctor ID ${id} not implemented yet.`);
  };

  // Handler to delete a doctor
  const handleDeleteDoctor = async (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
    alert('Doctor deleted successfully!');
  };

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SideNavHospital />
      <div className="p-10 bg-gray-100 md:ml-[260px]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Doctor Management</h1>
          <button onClick={handleAddDoctor} className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <FaPlus className="mr-2" /> Add New Doctor
          </button>
        </div>

        {/* Add New Doctor Section */}
        <div className="bg-white p-5 rounded shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Department:</label>
            <input
              type="text"
              value={newDoctor.department}
              onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role:</label>
            <input
              type="text"
              value={newDoctor.role}
              onChange={(e) => setNewDoctor({ ...newDoctor, role: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button onClick={handleAddDoctor} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Doctor
          </button>
        </div>

        {/* Doctor Search Section */}
        <DoctorSearch doctors={doctors} onSearch={setSearchTerm} />

        {/* List of Doctors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-5 rounded shadow-lg flex flex-col items-center hover:shadow-2xl transition-shadow">
              <FaUserMd className="text-blue-500 text-5xl mb-4" />
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <p className="text-gray-700">{doctor.department}</p>
              <p className="text-gray-500 italic">{doctor.role}</p>
              <div className="flex mt-4">
                <button onClick={() => router.push(`/doctor/${doctor.id}`)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                  View Profile
                </button>
                <button onClick={() => handleEditDoctor(doctor.id)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteDoctor(doctor.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;
