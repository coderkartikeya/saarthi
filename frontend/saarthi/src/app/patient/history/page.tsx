'use client'
import React, { useEffect, useState } from 'react';
import SideNav from '@/app/components/SideNav';

interface patient{
  fullname:String,
  dateOfBirth:Date,
  gender:String,
  contact:String,
  address:String,
  medicalHistory:[]
}
interface admission{
  hospitalName: String,
  admissionDate: String,
  dischargeDate: String,
  notes: String,
}
const PatientHistory = () => {
  const [admissions, setAdmissions] = useState([]);
  const [patient,setPatient]=useState<patient |null >()
  useEffect(()=>{
    const func=async()=>{
      const id=localStorage.getItem('userId');
      const response=await fetch(`http://localhost:4000/User/profile/${id}`)
      const data=await response.json()
      setPatient(data)
      setAdmissions(data.medicalHistory);
    }
    func();
  },[])

  const [comments, setComments] = useState([
    {
      date: '2024-08-01',
      content: 'Shared my experience with the new medication. It has been quite effective!',
    },
    {
      date: '2024-07-15',
      content: 'Participated in the discussion about recovery tips after surgery.',
    },
  ]);

  const [newAdmission, setNewAdmission] = useState<admission>({
    hospitalName: '',
    admissionDate:"",
    dischargeDate:"",
    notes: '',
  });

  useEffect(() => {
    const savedAdmissions = localStorage.getItem('admissions');
    if (savedAdmissions) {
      setAdmissions(JSON.parse(savedAdmissions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admissions', JSON.stringify(admissions));
  }, [admissions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAdmission((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleAddAdmission = async() => {
    setAdmissions((prevAdmissions) =>(prevAdmissions? [...prevAdmissions, newAdmission]: [newAdmission]));
    const updatedMedicalHistory = patient?.medicalHistory 
    ? [...patient.medicalHistory, newAdmission] 
    : [newAdmission];

  // Update the patient object with the new medical history
  const updatedPatient = {
    ...patient,
    medicalHistory: updatedMedicalHistory,
  };

  // Fetch user ID from local storage
  const id = localStorage.getItem('userId');

  // Send the updated patient profile to the server
  const res = await fetch(`http://localhost:4000/User/updatePatientProfile/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPatient),
  });

  // Log the updated patient object for debugging
  console.log(updatedPatient);

  // Handle the response
  if (res.ok) {
    alert('Patient Profile Updated');
  } else {
    alert('Error Updating Patient Profile');
  }

    setNewAdmission({ hospitalName: '', admissionDate:"", dischargeDate:"", notes: '' });
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <SideNav name="history" />

      <div className="max-w-8xl mx-auto p-6 bg-white rounded-xl shadow-lg md:ml-[320px] mb-30 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Patient History
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6">
            Hospital Admissions
          </h2>
          <div className="space-y-8">
            
            { admissions && admissions.map((admission, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h3 className="text-2xl font-bold text-gray-800">
                  {admission.hospitalName}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Admission Date:</span>{' '}
                  {admission.admissionDate?admission.admissionDate.split('T')[0]:""}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Discharge Date:</span>{' '}
                  {admission.dischargeDate?admission.dischargeDate.split('T')[0]:""}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Notes:</span> {admission.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800">Add New Admission</h3>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                name="hospitalName"
                value={newAdmission.hospitalName}
                onChange={handleInputChange}
                placeholder="Hospital Name"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <input
                type="date"
                name="admissionDate"
                value={newAdmission.admissionDate}
                onChange={handleInputChange}
                placeholder="Admission Date"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <input
                type="date"
                name="dischargeDate"
                value={newAdmission.dischargeDate}
                onChange={handleInputChange}
                placeholder="Discharge Date"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <textarea
                name="notes"
                value={newAdmission.notes}
                onChange={handleInputChange}
                placeholder="Notes"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                onClick={handleAddAdmission}
              >
                Add Admission
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-purple-600 mb-6">
            Recent Community Comments
          </h2>
          <div className="space-y-8">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-r from-white to-purple-50 rounded-lg shadow-md border-l-4 border-purple-500"
              >
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> {comment.date}
                </p>
                <p className="text-gray-800 mt-2">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientHistory;
