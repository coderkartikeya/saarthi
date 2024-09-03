'use client'
import SideNav from '@/app/components/SideNav';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set the app element for react-modal to fix the warning
// if (typeof document !== 'undefined') {
//   Modal.setAppElement('#__next'); // Assuming Next.js default root element
// }

// Define RowType
type RowType = {
  hospitalID: string;
  hospitalName: string;
  totalFreeBed: string;
  totalFreeCriticalBedWithoutVentilator: string;
  totalFreeCriticalBedWithVentilator: string;
  totalFreeNonCriticalBed: string;
  availableFreeCriticalBedWithoutVentilator: string;
  availableFreeCriticalBedWithVentilator: string;
  availableFreeNonCriticalBed: string;
  hospitalPhoneNumber: string;
  contactPersonName: string;
};

// Custom styles for the modal popup
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    borderRadius: '15px',
    border: '2px solid #333',
    padding: '20px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};

const HospitalInfo = () => {
  const [hospitals, setHospitals] = useState<RowType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();

        // Log the data to see what you actually get
        console.log(data);

        // Check if data contains tableData
        if (data && data.tableData) {
          // Sort hospitals by availableFreeNonCriticalBed (less waiting time first)
          const sortedData = data.tableData.sort(
            (a: RowType, b: RowType) =>
              parseInt(b.availableFreeNonCriticalBed) -
              parseInt(a.availableFreeNonCriticalBed)
          );

          setHospitals(sortedData);
        } else {
          throw new Error("Data structure is not as expected.");
        }
      } catch (err) {
        console.error("Failed to fetch hospital data:", err);
        setError("Failed to load hospital data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (error) {
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  }

  return (
    <div>
        <SideNav/>

    
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 md:ml-[280px]">
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <h2 className="text-xl font-bold mb-4">Delhi Government Data</h2>
        <p className="text-gray-700">The following data is provided by the Delhi Government and is subject to updates.</p>
        <button
          onClick={closeModal}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Close
        </button>
      </Modal>

      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Hospital Bed Availability
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hospital, index) => {
            const isWaiting = parseInt(hospital.availableFreeNonCriticalBed) <= 0;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md transition-all duration-200 ${
                  isWaiting
                    ? 'bg-red-50 border-l-8 border-red-500'
                    : 'bg-white border-l-8 border-green-500'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {hospital.hospitalName}
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Total Free Beds:</span> {hospital.totalFreeBed}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Critical (Without Ventilator):</span>{' '}
                  {hospital.totalFreeCriticalBedWithoutVentilator}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Critical (With Ventilator):</span>{' '}
                  {hospital.totalFreeCriticalBedWithVentilator}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Non-Critical Beds:</span>{' '}
                  {hospital.totalFreeNonCriticalBed}
                </p>
                <p className={`text-lg font-semibold mt-4 ${isWaiting ? 'text-red-600' : 'text-green-600'}`}>
                  Available Non-Critical Beds: {hospital.availableFreeNonCriticalBed}
                </p>
                <p className="text-gray-500 mt-2">
                  <span className="font-semibold">Contact:</span> {hospital.contactPersonName} ({hospital.hospitalPhoneNumber})
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default HospitalInfo;
