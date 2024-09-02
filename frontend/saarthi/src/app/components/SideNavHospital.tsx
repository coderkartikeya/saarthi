'use client'
import React, { useState } from 'react';
import { FaUser, FaHospital, FaHistory, FaUsers, FaSignOutAlt, FaEdit, FaBars, FaTimes, FaBed, FaChartBar, FaStethoscope } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SideNavHospital = (props:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className='flex'>
      <div className='flex flex-col p-5 md:w-[260px] h-full items-center fixed md:bg-zinc-900 rounded gap-7 z-10'>
        <div className='hidden md:block'>
        <div className={`flex items-center mb-4 p-5 rounded ${props.name=='profile' ? 'bg-zinc-800' : ''} hover:bg-zinc-800`}>
            <Link href={`/hospital`} className='flex flex-row'>
              <span className='mr-2 text-white'>
                <FaUser size={24} />
              </span>
              <h1 className='text-2xl text-white'>Profile</h1>
            </Link>
          </div>
          <div className={`flex items-center mb-4 p-5 rounded ${props.name=='patients' ? 'bg-zinc-800' : ''} hover:bg-zinc-800`}>
            <Link href={`/hospital/patients`} className='flex flex-row'>
              <span className='mr-2 text-white'>
                <FaUser size={24} />
              </span>
              <h1 className='text-2xl text-white'>Patients</h1>
            </Link>
          </div>
          <div className={`flex items-center mb-4 p-5 rounded ${props.name=='doctors' ? 'bg-zinc-800' : ''} hover:bg-zinc-800`}>
            <Link href={`/hospital/doctors`} className='flex flex-row'>
              <span className='mr-2 text-white'>
                <FaStethoscope size={24} />
              </span>
              <h1 className='text-2xl text-white'>Doctors</h1>
            </Link>
          </div>
          <div className={`flex items-center mb-4 p-5 rounded ${props.name=='beds' ? 'bg-zinc-800' : ''} hover:bg-zinc-800`}>
            <Link href={`/hospital/beds`} className='flex flex-row'>
              <span className='mr-2 text-white'>
                <FaBed size={24} />
              </span>
              <h1 className='text-2xl text-white'>Beds Available</h1>
            </Link>
          </div>
          <div className={`flex items-center mb-4 p-5 rounded ${props.name=='charts' ? 'bg-zinc-800' : ''} hover:bg-zinc-800`}>
            <Link href={`/hospital/medicine`} className='flex flex-row'>
              <span className='mr-2 text-white'>
                <FaChartBar size={24} />
              </span>
              <h1 className='text-2xl text-white'>Medicine Charts</h1>
            </Link>
          </div>
          <div className={`flex items-center mb-4 p-5 rounded ${props.name=='community' ? 'bg-zinc-800' : ''} hover:bg-zinc-800`}>
            <Link href={`/hospital/charts`} className='flex flex-row'>
              <span className='mr-2 text-white'>
                <FaUsers size={24} />
              </span>
              <h1 className='text-2xl text-white'>Community</h1>
            </Link>
          </div>
          <div className={`flex items-center mb-4 p-5 rounded hover:bg-zinc-800`}>
            <button className='flex' onClick={() => router.push('/')}>
              <span className='mr-2 text-white'>
                <FaSignOutAlt size={24} />
              </span>
              <h1 className='text-2xl text-white'>Sign Out</h1>
            </button>
          </div>
        </div>
        
        <div className='md:hidden z-20'>
          <button
            className='font-bold py-2 px-4 rounded items-center'
            onClick={() => setIsOpen(prevOpen => !prevOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className={isOpen ? 'block bg-zinc-900 p-2' : 'hidden'}>
          <Link href={`/hospital`} className='flex flex-row'>
              <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
                <span className='mr-2 text-white'>
                  <FaUser size={24} />
                </span>
                <h1 className='text-2xl text-white'>Profile</h1>
              </div>
            </Link>
            <Link href={`/hospital/patients`} className='flex flex-row'>
              <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
                <span className='mr-2 text-white'>
                  <FaUser size={24} />
                </span>
                <h1 className='text-2xl text-white'>Patients</h1>
              </div>
            </Link>
            <Link href={`/hospital/doctors`} className='flex flex-row'>
              <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
                <span className='mr-2 text-white'>
                  <FaStethoscope size={24} />
                </span>
                <h1 className='text-2xl text-white'>Doctors</h1>
              </div>
            </Link>
            <Link href={`/hospital/beds`} className='flex flex-row'>
              <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
                <span className='mr-2 text-white'>
                  <FaBed size={24} />
                </span>
                <h1 className='text-2xl text-white'>Beds Available</h1>
              </div>
            </Link>
            <Link href={`/hospital/charts`} className='flex flex-row'>
              <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
                <span className='mr-2 text-white'>
                  <FaUsers size={24} />
                </span>
                <h1 className='text-2xl text-white'>Community</h1>
              </div>
            </Link>
            <Link href={`/hospital/medicine`} className='flex flex-row'>
              <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
                <span className='mr-2 text-white'>
                  <FaChartBar size={24} />
                </span>
                <h1 className='text-2xl text-white'>Medicine Charts</h1>
              </div>
            </Link>
            <div className='flex items-center mb-4 md:p-5 p-3 rounded hover:bg-zinc-800'>
              <button className='flex' onClick={() => router.push('/')}>
                <span className='mr-2 text-white'>
                  <FaSignOutAlt size={24} />
                </span>
                <h1 className='text-2xl text-white'>Sign Out</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNavHospital;
