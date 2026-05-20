import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
    return (
        <section className='w-full flex items-center justify-center h-screen p-16 bg-gray-50'>
            <div className='text-center'>
                <h2 className='mb-8 font-extrabold text-9xl'>
                    <span className='sr-only'>Error</span>404
                </h2>
                <p className='text-2xl font-semibold md:text-3xl'>Sorry, we couldn't find this page.</p>
                <div className='flex justify-center mt-4'>
                    <button className='hover:cursor-pointer bg-blue-600 px-5 py-2 text-white' onClick={handleClick}>Back to Home Page</button>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound