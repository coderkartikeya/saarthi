import React from 'react'
import PostPage from '@/app/components/Post'
import SideNav from '@/app/components/SideNav'

const page = () => {
  return (
    <div>
        <SideNav name={`post`}/>
        <div className='md:ml-[300px]'>
        <PostPage />

        </div>
        
    </div>
  )
}

export default page