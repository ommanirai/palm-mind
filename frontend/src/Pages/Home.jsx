import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/signup")
  }
  return (
    <section className='w-full flex items-center justify-center h-screen p-16 bg-gray-50'>
      <div className='text-center'>
        <h2 className='mb-8 font-medium lg:font-extrabold text-7xl lg:text-9xl'>
          Your chat application
        </h2>
        <p className='text-2xl font-semibold md:text-3xl'>Sign up to chat with people.</p>
        <div className='flex justify-center mt-4'>
          <button className='hover:cursor-pointer bg-blue-600 px-5 py-2 text-white' onClick={handleClick}>Sign up here</button>
        </div>
      </div>
    </section>
  )
}

export default Home
