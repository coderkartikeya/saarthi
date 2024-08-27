'use client';
import React from 'react';
import Link from 'next/link';
import { FaHospitalAlt, FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import SideNav from '@/app/components/SideNav';

interface Hospital {
  id: number;
  name: string;
  location: string;
  availableBeds: number;
  profileUrl: string;
}

const hospitals: Hospital[] = [
  { id: 1, name: 'City Hospital', location: 'New York, NY', availableBeds: 15, profileUrl: '/hospitals/1' },
  { id: 2, name: 'Green Valley Medical Center', location: 'Los Angeles, CA', availableBeds: 8, profileUrl: '/hospitals/2' },
  { id: 3, name: 'Riverfront Hospital', location: 'Chicago, IL', availableBeds: 22, profileUrl: '/hospitals/3' },
  // Add more hospitals as needed
];

const HospitalListPage = () => {
  return (
    <div>
      <SideNav name={`hospital`}/>
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-green-200 to-blue-200 rounded-xl shadow-lg mt-10 md:ml-[300px]">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Available Hospitals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FaHospitalAlt className="text-green-500 text-3xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">{hospital.name}</h2>
            </div>
            <div className="text-gray-600 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" /> {hospital.location}
            </div>
            <div className="text-gray-600 mb-4 flex items-center">
              <FaBed className="mr-2 text-gray-500" /> {hospital.availableBeds} Beds Available
            </div>
            <Link href={hospital.profileUrl}>
              <div className="bg-green-500 text-white text-center font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                View Profile
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HospitalListPage;
