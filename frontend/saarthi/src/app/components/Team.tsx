'use client'
import React from 'react'

const Team = () => {
  return (
    <div className='bg-white py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-4'>Meet Our Team</h2>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* <img src='/member1.jpg' alt='Member 1' className='w-full h-48 object-cover rounded-lg mb-4' /> */}
              <h4 className='text-lg font-bold mb-2'>Kartikeya Vats</h4>
              <p className='text-gray-600'>Team Lead</p>
              <p className='text-gray-600'>Aspiring Software Engineer </p>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* <img src='/member2.jpg' alt='Member 2' className='w-full h-48 object-cover rounded-lg mb-4' /> */}
              <h4 className='text-lg font-bold mb-2'>Pratham Rawat</h4>
              <p className='text-gray-600'>Backend Developer</p>
              <p className='text-gray-600'>Aspiring Software Engineer</p>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* <img src='/member3.jpg' alt='Member 3' className='w-full h-48 object-cover rounded-lg mb-4' /> */}
              <h4 className='text-lg font-bold mb-2'>Akhil Kumar</h4>
              <p className='text-gray-600'>Frontend Developer</p>
              <p className='text-gray-600'>Aspiring Software Engineer</p>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* <img src='/member4.jpg' alt='Member 4' className='w-full h-48 object-cover rounded-lg mb-4' /> */}
              <h4 className='text-lg font-bold mb-2'>Atul Saharan</h4>
              <p className='text-gray-600'>Frontend Developer</p>
              <p className='text-gray-600'>Aspiring Electronics Engineer</p>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* <img src='/member5.jpg' alt='Member 5' className='w-full h-48 object-cover rounded-lg mb-4' /> */}
              <h4 className='text-lg font-bold mb-2'>Aditya Mistri</h4>
              <p className='text-gray-600'>Backend Developer</p>
              <p className='text-gray-600'>Aspiring Software Engineer</p>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* <img src='/member6.jpg' alt='Member 6' className='w-full h-48 object-cover rounded-lg mb-4' /> */}
              <h4 className='text-lg font-bold mb-2'>Sharvi Aggarwal</h4>
              <p className='text-gray-600'>Creative Lead</p>
              <p className='text-gray-600'>Aspiring Electronics Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team