'use client'
import SideNavHospital from '@/app/components/SideNavHospital';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaBed, FaEdit, FaSave } from 'react-icons/fa';

const BedAvailability = () => {
  const [beds, setBeds] = useState({
    ICU: 5,
    General: 15,
    Pediatric: 10,
    Maternity: 8,
  });

  const [editMode, setEditMode] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', type: 'ICU', status: 'pending' },
    { id: 2, name: 'Jane Smith', type: 'General', status: 'pending' },
  ]);

  const handleInputChange = (e:any, type:any) => {
    setBeds({
      ...beds,
      [type]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleRequestAction = (id:any, action:any) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: action } : request
    ));
  };

  return (
    <div>
        <SideNavHospital name={`beds`}/>
    <div className="p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen md:ml-[260px]">
      {/* Header */}
      <div className="bg-white p-5 rounded shadow-lg flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Bed Availability Management</h1>
        <button 
          onClick={handleEditToggle} 
          className="text-white bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded flex items-center"
        >
          {editMode ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
          {editMode ? 'Save Changes' : 'Edit'}
        </button>
      </div>

      {/* Bed Availability Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.keys(beds).map((type) => (
          <div key={type} className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaBed className="mr-2 text-blue-600" /> {type} Beds
            </h2>
            {editMode ? (
              <input 
                type="number" 
                value={beds[type]} 
                onChange={(e) => handleInputChange(e, type)} 
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-xl">{beds[type]} Beds Available</p>
            )}
          </div>
        ))}
      </div>

      {/* Patient Requests Section */}
      <div className="bg-white p-5 rounded shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">Patient Bed Requests</h2>
        <ul>
          {requests.map((request) => (
            <li 
              key={request.id} 
              className={`p-4 rounded mb-4 flex items-center justify-between ${request.status === 'accepted' ? 'bg-green-100' : request.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'}`}
            >
              <span>
                <strong>{request.name}</strong> - {request.type} Bed
              </span>
              <div className="flex items-center">
                {request.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleRequestAction(request.id, 'accepted')} 
                      className="text-green-600 mr-4"
                    >
                      <FaCheckCircle size={24} />
                    </button>
                    <button 
                      onClick={() => handleRequestAction(request.id, 'rejected')} 
                      className="text-red-600"
                    >
                      <FaTimesCircle size={24} />
                    </button>
                  </>
                )}
                {request.status !== 'pending' && (
                  <span className="text-lg font-bold">
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default BedAvailability;
