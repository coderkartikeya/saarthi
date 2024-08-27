import SideNav from '@/app/components/SideNav';
import React from 'react';

const PatientHistory = () => {
  const admissions = [
    {
      hospitalName: 'City Hospital',
      admissionDate: '2024-01-15',
      dischargeDate: '2024-02-05',
      notes: 'Treated for pneumonia. Excellent recovery.',
    },
    {
      hospitalName: 'Central Health Clinic',
      admissionDate: '2023-11-20',
      dischargeDate: '2023-11-30',
      notes: 'Minor surgery for appendicitis.',
    },
  ];

  const comments = [
    {
      date: '2024-08-01',
      content: 'Shared my experience with the new medication. It has been quite effective!',
    },
    {
      date: '2024-07-15',
      content: 'Participated in the discussion about recovery tips after surgery.',
    },
  ];

  return (
    <div className="flex bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <SideNav name={`history`} />

      <div className="max-w-8xl mx-auto p-6 bg-white rounded-xl shadow-lg md:ml-[320px] mb-30 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Patient History
        </h1>

        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6">
            Hospital Admissions
          </h2>
          <div className="space-y-8">
            {admissions.map((admission, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h3 className="text-2xl font-bold text-gray-800">
                  {admission.hospitalName}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Admission Date:</span>{' '}
                  {admission.admissionDate}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Discharge Date:</span>{' '}
                  {admission.dischargeDate}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Notes:</span> {admission.notes}
                </p>
              </div>
            ))}
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
