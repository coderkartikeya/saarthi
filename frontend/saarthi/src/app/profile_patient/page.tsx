'use client';
import React from 'react';
import { FaCommentDots, FaUserCircle } from 'react-icons/fa';

interface PatientProfileProps {
  patientName: string;
  recentComments: string[];
}

const PatientProfilePage: React.FC<PatientProfileProps> = ({ patientName, recentComments }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <FaUserCircle className="text-8xl mr-4 drop-shadow-lg" />
            <h1 className="text-5xl font-bold drop-shadow-lg">{patientName}</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-10 space-y-8">
          {/* Recent Community Comments */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Recent Community Comments</h3>
            <ul className="space-y-6">
              {recentComments.map((comment, index) => (
                <li
                  key={index}
                  className="flex items-start bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <FaCommentDots className="text-3xl text-indigo-600 mr-6" />
                  <p className="text-lg text-gray-700 leading-relaxed">{comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage with sample data
const PatientProfilePageExample = () => {
  const patientData = {
    patientName: 'John Doe',
    recentComments: [
      'Had a great experience at City Hospital. Highly recommend!',
      'Looking for advice on recovery after surgery. Any tips?',
      'Thankful for all the support from the community!',
    ],
  };

  return <PatientProfilePage {...patientData} />;
};

export default PatientProfilePageExample;
