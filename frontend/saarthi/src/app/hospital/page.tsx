import React from 'react'
import SideNavHospital from '../components/SideNavHospital'
import HospitalProfile from '../components/ProfileHospital'

const page = () => {
  return (
    <div>
        <SideNavHospital name={`profile`}/>

        <div>
          <HospitalProfile/>
          
        </div>
    </div>
  )
}

export default page