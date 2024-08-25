'use client'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-200 py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap justify-center mb-4'>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <h5 className='uppercase text-lg font-bold mb-2'>About Us</h5>
            <p className='text-gray-600'>
              Saarthi is a hospital management system designed to make healthcare more accessible and efficient.
            </p>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <h5 className='uppercase text-lg font-bold mb-2'>Contact Us</h5>
            <ul>
              <li className='text-gray-600'>
                <a href='#' className='hover:text-gray-900'>support@saarthi.com</a>
              </li>
              <li className='text-gray-600'>
                <a href='#' className='hover:text-gray-900'>+91 1234567890</a>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
            <h5 className='uppercase text-lg font-bold mb-2'>Social Media</h5>
            <ul>
              <li className='text-gray-600'>
                <a href='#' className='hover:text-gray-900'>
                  <i className='fab fa-facebook-f mr-2'></i> Facebook
                </a>
              </li>
              <li className='text-gray-600'>
                <a href='#' className='hover:text-gray-900'>
                  <i className='fab fa-twitter mr-2'></i> Twitter
                </a>
              </li>
              <li className='text-gray-600'>
                <a href='#' className='hover:text-gray-900'>
                  <i className='fab fa-instagram mr-2'></i> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='text-center text-gray-600'>
          &copy; 2024 Saarthi. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer