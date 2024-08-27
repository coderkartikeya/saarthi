import CommunityPage from '@/app/components/Community'
import SideNav from '@/app/components/SideNav'
import React from 'react'

const page = () => {
  return (
    <div className='bg-gray-100'>
        <SideNav name={`community`}/>
        <div className='md:ml-[300px]'>
            <CommunityPage link={`/patient/post`}/>
        </div>
    </div>
  )
}

export default page