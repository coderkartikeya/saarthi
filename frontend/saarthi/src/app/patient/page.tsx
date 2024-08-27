import React from 'react'
import SideNav from '../components/SideNav'
import PatientProfile from '../components/PatientProfile'

const page = () => {
  return (
    <div className='h-screen bg-slate-100 overflow-y-scorll no-scrollbar '>
        <SideNav name={`main`}/>
        <div className='md:ml-[300px] md:pt-[50px]  md:p-5 h-screen  overflow-y-scorll no-scrollbar mb-40'>
          <PatientProfile/>
        </div>
    </div>
  )
}

export default page