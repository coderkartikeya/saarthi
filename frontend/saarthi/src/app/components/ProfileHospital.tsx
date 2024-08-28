'use client'
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2'; 
import 'chart.js/auto'; 

const HospitalProfile = () => {
  return (
    <div className="md:ml-[260px] p-5 md:p-10 bg-gray-100">
      
      <div className="bg-white p-5 rounded shadow-lg flex flex-col md:flex-row items-center md:items-start">
        <img src="/hospital-logo.png" alt="Hospital Logo" className="w-32 h-32 mb-4 md:mb-0" />
        <div className="text-center md:text-left ml-0 md:ml-6">
          <h1 className="text-3xl md:text-4xl font-bold">Sunshine Hospital</h1>
          <p className="text-lg md:text-xl text-gray-700">123 Wellness Ave, Health City</p>
          <div className="flex flex-col md:flex-row items-center md:items-start my-3">
            <div className="flex items-center">
              <FaPhone className="text-green-600 mr-2" /> <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center mx-0 md:mx-4">
              <FaEnvelope className="text-blue-600 mr-2" /> <span>info@sunshinehospital.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-red-600 mr-2" /> <a href="https://maps.google.com">Get Directions</a>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <FaStar className="text-yellow-500 mr-1" /> 4.8 (240 Reviews)
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-10">
        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Monthly Patient Admissions</h2>
          <Bar
            data={{
              labels: ['January', 'February', 'March', 'April'],
              datasets: [
                {
                  label: 'Admissions',
                  data: [120, 190, 300, 250],
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Bed Occupancy Rate</h2>
          <Line
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [
                {
                  label: 'Occupancy Rate',
                  data: [85, 90, 78, 95],
                  borderColor: 'rgba(255, 99, 132, 0.8)',
                  fill: true,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      
      <div className="bg-white p-5 rounded shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside">
          <li className="mb-3">Health Camp organized on 24th August 2024.</li>
          <li className="mb-3">New Cardiology Wing inaugurated on 15th July 2024.</li>
          <li className="mb-3">Sunshine Hospital partnered with XYZ Health for a new research initiative.</li>
        </ul>
      </div>
    </div>
  );
}

export default HospitalProfile;
