'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {toggle && (
        <div className='absolute top-20 right-0 w-40 text-white shadow-md py-4 flex items-center justify-center'>
          <ul>
            <li>
              <a href='/About' className='text-lg font-bold shadow-md shadow-white p-1'>About </a>
            </li>
            <li>
              <a href='/contactus' className='text-lg font-bold shadow-md shadow-white p-1'>Contact Us</a>
            </li>
            <li>
              <Link href='/login' className='text-lg font-bold shadow-md shadow-white p-1'>Login</Link>
            </li>
            <li>
              <a href='https://github.com/coderkartikeya/saarthi' className='text-lg font-bold shadow-md shadow-white p-1'>GitHub</a>
            </li>
          </ul>
        </div>
      )}
      <div className={`flex flex-col items-center w-screen justify-around relative ${toggle ? `blur-sm` : ``}`}>
        <Image src={'/nav.jpg'} alt='image' height={500} width={700} className='w-full h-[500px] rounded-es-4xl' />
        <div className='absolute top-0 left-0 w-full flex justify-center pt-4'>
          <div className='flex mt-4 justify-around w-full md:gap-20'>
            <h1 className='text-3xl font-bold text-white'>
              Saarthi
            </h1>
            <div className='hidden sm:flex gap-10 text-white '>        
              <div className='hover:rounded hover:border-2 md:p-1 hover:shadow-md hover:shadow-white'>
                <a href='/About' className='text-lg font-bold'>About </a>
              </div>
              <div className='hover:rounded hover:border-2 md:p-1 hover:shadow-md hover:shadow-white'>
                <a href='/contactus' className='text-lg font-bold'>Contact Us</a>
              </div>
              <div className='hover:rounded hover:border-2 md:p-1 hover:shadow-md hover:shadow-white'>
                <Link href='/login' className='text-lg font-bold'>Login</Link>
              </div>
              <div className='hover:rounded hover:border-2 md:p-1 hover:shadow-md hover:shadow-white'>
                <a href='https://github.com/coderkartikeya/saarthi' className='text-lg font-bold'>GitHub</a>
              </div>
            </div>
            <div className='sm:hidden flex justify-end'>
              <button onClick={() => setToggle(!toggle)} className='text-white text-3xl'>
                {toggle ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        <div className='absolute top-50 left-0 md:w-1/2 w-full flex items-center pt-4 md:gap-5 gap-2 justify-center flex-col'>
          <h1 className='text-white md:text-7xl text-5xl font-bold ml-full'>A Step...</h1>
          <h1 className='text-white md:text-6xl text-4xl font-bold ml-full'>Towards</h1>
          <h1 className='text-white md:text-5xl text-3xl font-bold ml-full'>Health!</h1>
        </div>
      </div>
    </div>
  )
}

export default Nav