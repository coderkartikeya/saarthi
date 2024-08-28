'use client'
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const DoctorSearch = ({ doctors, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="bg-white p-5 rounded shadow-lg mb-10 flex items-center">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default DoctorSearch;
