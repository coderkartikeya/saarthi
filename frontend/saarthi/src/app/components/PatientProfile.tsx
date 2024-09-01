"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaUser, FaEdit, FaSave } from 'react-icons/fa';
// AIzaSyC1TW1J9yJnIeNDiruRuUMMBfcWN1Ic5ns
const PatientProfile = () => {
  const [editing, setEditing] = useState(false);
  const [patient, setPatient] = useState({
    fullname: '',
    dateofbirth: '',
    gender: '',
    contact: '',
    address: '',
        
    
  });
  
  useEffect(()=>{
    const id=localStorage.getItem('userId');
    
    if(id){
      const data=async()=>{
        const response=await fetch(`http://localhost:4000/User/profile/${id}`);
        const result=await response.json();
        const { fullname, dateOfBirth, gender, contact, address, medicalHistory } = result;
        var dateofbirth="";
        if(dateOfBirth){
          dateofbirth=dateOfBirth.split('T')[0];
        }
        
        
      setPatient({ fullname, dateofbirth, gender, contact, address });
      // console.log(fullname, dateOfBirth, gender, contact, address, medicalHistory)

      }
      data();
    }
    
  },[])

  
  

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async() => {
    setEditing(false);
    const id=localStorage.getItem('userId');
    const req=await fetch(`http://localhost:4000/User/updatePatientProfile/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        fullname:patient.fullname,
        dateOfBirth:patient.dateofbirth,
        gender:patient.gender,
        contact:patient.contact,
        address:patient.address

      })

    })
    if(req.status){
      alert('Profile updated successfully');
    }else{
      alert('Failed to update profile');
    }
  };

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
    
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-lg max-w-6xl mx-auto">
      <div className="relative">
        <Image
          height={600}
          width={600}
          src={'/profile_patient_bg.jpg'}
          alt="image"
          className="h-64 w-full rounded-xl "
        />
        <div className="absolute top-52 left-8 transform -translate-y-1/2">
          <div className="bg-white p-2 rounded-full shadow-md">
            <div className="bg-black text-white p-6 rounded-full">
              <FaUser size={50} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Patient Profile</h1>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
  {Object.keys(patient).map((field, index) => (
    <div key={index} className="flex flex-col">
      <label className="text-gray-600 font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
      
        
      
        <input
          type={field.includes('Date') ? 'date' : 'text'}
          name={field}
          value={patient?.[field as keyof typeof patient] ?? ''} // cast field to keyof typeof patient
          onChange={handleInputChange}
          disabled={!editing}
          className={`p-3 rounded-lg mt-2 bg-gray-100 ${editing ? 'bg-white border border-gray-300' : 'cursor-not-allowed'}`}
        />
      
    </div>
  ))}
</div>
      <div className="mt-8 flex justify-center">
        {editing ? (
          <button
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
            onClick={handleSave}
          >
            <FaSave className="mr-2" /> Save
          </button>
        ) : (
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            onClick={handleEdit}
          >
            <FaEdit className="mr-2" /> Edit
          </button>
        )}
      </div>
    </div>
  );
};


export default PatientProfile;
