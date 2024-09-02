'use client'
import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import 'chart.js/auto'; 
import SideNavHospital from '@/app/components/SideNavHospital';

// ekk interface hi bna diya
interface Medicine {
  id: number;
  name: string;
  quantity: number;
  usage: number;
}

// kuch sample data 
const initialMedicines: Medicine[] = [
  { id: 1, name: 'Aspirin', quantity: 200, usage: 50 },
  { id: 2, name: 'Ibuprofen', quantity: 150, usage: 40 },
  { id: 3, name: 'Paracetamol', quantity: 300, usage: 80 },
  { id: 4, name: 'Amoxicillin', quantity: 180, usage: 60 },
];

const MedicineCharts = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [newMedicine, setNewMedicine] = useState<Medicine>({ id: 0, name: '', quantity: 0, usage: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  // new medicine yahan par
  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.quantity && newMedicine.usage) {
      const newId = medicines.length ? Math.max(medicines.map(m => m.id)) + 1 : 1;
      const addedMedicine = { id: newId, ...newMedicine };

      // api call yahan se kar denge
      setMedicines([...medicines, addedMedicine]);
      setNewMedicine({ id: 0, name: '', quantity: 0, usage: 0 });
      alert('Medicine added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };

  //  yahan se kar dega delete
  const handleDeleteMedicine = (id: number) => {
    const updatedMedicines = medicines.filter((medicine) => medicine.id !== id);
    setMedicines(updatedMedicines);
    alert('Medicine deleted successfully!');
  };

  // filetring medicine here
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <SideNavHospital/>
    <div className="p-10 bg-gray-100 md:ml-[260px]">
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold">Medicine Charts</h1>
        <button onClick={handleAddMedicine} className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <FaPlus className="mr-2" /> Add New Medicine
        </button>
      </div>

      
      <div className="bg-white p-5 rounded shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity:</label>
          <input
            type="number"
            value={newMedicine.quantity}
            onChange={(e) => setNewMedicine({ ...newMedicine, quantity: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Usage:</label>
          <input
            type="number"
            value={newMedicine.usage}
            onChange={(e) => setNewMedicine({ ...newMedicine, usage: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button onClick={handleAddMedicine} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Medicine
        </button>
      </div>

      
      <div className="bg-white p-5 rounded shadow-lg mb-10">
        <div className="flex items-center">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Medicine Quantity</h2>
          <Bar
            data={{
              labels: filteredMedicines.map(m => m.name),
              datasets: [
                {
                  label: 'Quantity',
                  data: filteredMedicines.map(m => m.quantity),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Medicine Usage</h2>
          <Pie
            data={{
              labels: filteredMedicines.map(m => m.name),
              datasets: [
                {
                  label: 'Usage',
                  data: filteredMedicines.map(m => m.usage),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                  ],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white p-5 rounded shadow-lg flex flex-col items-center hover:shadow-2xl transition-shadow">
            <h2 className="text-2xl font-bold mb-2">{medicine.name}</h2>
            <p className="text-gray-700">Quantity: {medicine.quantity}</p>
            <p className="text-gray-500 italic">Usage: {medicine.usage}</p>
            <div className="flex mt-4">
              <button onClick={() => alert(`Edit functionality for medicine ID ${medicine.id} not implemented yet.`)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteMedicine(medicine.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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

export default MedicineCharts;
