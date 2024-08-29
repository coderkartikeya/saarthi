"use client"
import React  from 'react';
const AboutPage = () => {

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Our Solution</h1>

        {/* Image Section */}
        <div className="flex justify-center mb-6">
          <img
            src="/opd.png" // Replace with the correct path to your image
            alt="Hospital Queue Management"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        <p className="text-lg text-gray-700 mb-6">
          Our cutting-edge hospital management solution addresses the critical needs of modern healthcare systems. 
          We focus on optimizing queuing models in Outpatient Departments (OPDs), managing bed availability, 
          and streamlining patient admissions, ensuring hospitals operate efficiently and effectively. Our solution 
          can be seamlessly integrated with a city-wide healthcare module, offering a scalable approach to healthcare management.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Challenges in Healthcare</h2>
        <p className="text-lg text-gray-700 mb-6">
          Hospitals face numerous challenges, including long wait times in OPDs, unpredictable bed availability, and inefficient 
          patient admission processes. These challenges often lead to bottlenecks, reduced patient satisfaction, and operational inefficiencies.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Solution</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our hospital management system tackles these challenges head-on by implementing dynamic queuing models, real-time bed 
          availability tracking, and automated patient admission workflows. These tools help reduce patient wait times, 
          optimize bed usage, and ensure smoother hospital operations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seamless City-Wide Integration</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our solution doesn't stop at the hospital level. By integrating with a city-wide healthcare module, our platform enables 
          data sharing and coordination across multiple hospitals, improving resource allocation and emergency response times. 
          This integration supports better city-level healthcare management, ultimately benefiting patients and healthcare providers alike.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our vision is to transform healthcare delivery by creating a more connected, efficient, and patient-centered system. 
          By reducing bottlenecks and improving hospital efficiency, we aim to enhance the quality of care for every patient, 
          regardless of where they seek treatment.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>Real-time dynamic queuing models for OPDs.</li>
          <li>Live bed availability tracking across departments.</li>
          <li>Automated and streamlined patient admission processes.</li>
          <li>City-wide integration for better resource management and coordination.</li>
          <li>Scalable solution adaptable to hospitals of all sizes.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us in Revolutionizing Healthcare</h2>
        <p className="text-lg text-gray-700">
          We are dedicated to improving healthcare systems worldwide. If you share our vision of a more efficient and connected 
          healthcare system, we invite you to join us. Whether you’re a hospital administrator, healthcare provider, or 
          city planner, our solution can help you deliver better care to your patients. Learn more by <a href="/contactus" className="text-blue-500 hover:underline">contacting us</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
