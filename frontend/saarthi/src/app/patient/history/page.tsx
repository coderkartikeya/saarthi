'use client';
import React, { useEffect, useState } from 'react';
import SideNav from '@/app/components/SideNav';

// Define the interface based on the schema provided
interface Admission {
  patient:string;
  doctor: string;
  date: string; // Keeping it as a string for easier handling, could be Date if needed
  diagnosis: string;
  prescription: string;
  hospital?: string;
}

interface Comment {
  date: string;
  content: string;
}

const PatientHistory = () => {
  const userId=localStorage.getItem('userId');
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newAdmission, setNewAdmission] = useState<Admission>({
    patient:'',
    doctor: '',
    date: '',
    diagnosis: '',
    prescription: '',
    hospital: '', // Default to an empty string to allow for optionality
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      const id = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:4000/User/profile/${id}`);
      const data = await response.json();
      setAdmissions(data.medicalHistory);
      setComments(data.comments || []); // Assuming the comments are part of the user profile
    };
    fetchPatientData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAdmission((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmission = async () => {
    const id = localStorage.getItem('userId');
    // console.log(id)
    newAdmission.patient?`${id}`:"";

    const updatedAdmissions = [...admissions, newAdmission];

    const updatedPatientProfile = {
      medicalHistory: updatedAdmissions,
    };

    const res = await fetch(`http://localhost:4000/User/updatePatientProfile/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatientProfile),
    });

    if (res.ok) {
      alert('Patient Profile Updated');
      setAdmissions(updatedAdmissions);
    } else {
      alert('Error Updating Patient Profile');
    }

    setNewAdmission({
      patient:'',
      doctor: '',
      date: '',
      diagnosis: '',
      prescription: '',
      hospital: '',
    });
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
            Medical Admissions
          </h2>
          <div className="space-y-8">
            {admissions &&
              admissions.map((admission, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-md border-l-4 border-blue-500"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    Doctor: {admission.doctor}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Date:</span> {admission.date.split('T')[0]}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">Diagnosis:</span> {admission.diagnosis}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">Prescription:</span> {admission.prescription}
                  </p>
                  {admission.hospital && (
                    <p className="text-gray-600 mt-1">
                      <span className="font-semibold">Hospital:</span> {admission.hospital}
                    </p>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800">Add New Admission</h3>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                name="doctor"
                value={newAdmission.doctor}
                onChange={handleInputChange}
                placeholder="Doctor"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <input
                type="date"
                name="date"
                value={newAdmission.date}
                onChange={handleInputChange}
                placeholder="Date"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <input
                type="text"
                name="diagnosis"
                value={newAdmission.diagnosis}
                onChange={handleInputChange}
                placeholder="Diagnosis"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <textarea
                name="prescription"
                value={newAdmission.prescription}
                onChange={handleInputChange}
                placeholder="Prescription"
                className="p-3 rounded-lg w-full border border-gray-300"
              />
              <input
                type="text"
                name="hospital"
                value={newAdmission.hospital}
                onChange={handleInputChange}
                placeholder="Hospital (Optional)"
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
