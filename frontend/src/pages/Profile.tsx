import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const Profile = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div  className="container mx-auto px-2 md:px-6 lg:px-8 flex flex-col justify-around text-white md:flex-row">
          <div className='hidden md:flex md:w-1/5 bg-blue-900'>
          <div className='flex flex-col'>
            <a href="/orders/me">Tüm Siparişlerim</a>
            <a href="/reviews/me">Değerlendirmelerim</a>
          </div>
          </div>
          <div className='md:w-4/5 bg-black'>
          TEST2
          </div>
        </div>
    </div>
  )
}

export default Profile
