import React, { useEffect, useState } from 'react'
import { HttpClient } from '../Utils/HttpClient';
import { ErrorHandler } from '../Utils/ErrorHandler';
import { Notify } from '../Utils/Notify';
import { useNavigate, useParams } from "react-router-dom";

const ProfileDetails = () => {
    const [data, setData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        HttpClient.GET(`/user/${id}`, true)
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })
    }, [])

    return (
        <section className='w-full flex items-center justify-center min-h-screen p-6 bg-gray-50'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-8'>
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-extrabold text-gray-800'>
                        Your profile Details
                    </h2>
                </div>

                <form className='space-y-5'>
                    <div>
                        <label className='font-bold block mb-2 text-sm text-gray-700'>
                            Full Name :
                        </label>
                        <div>{data.full_name}</div>
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-bold text-gray-700'>
                            Email :
                        </label>
                        <div>{data.email}</div>
                    </div>
                </form>

                <p className='mt-6 text-center text-sm text-gray-500'>
                    <a href='/user/profile' className='ml-1 text-blue-600 hover:underline'>
                        Back to profile
                    </a>
                </p>
            </div>
        </section>
    )
}

export default ProfileDetails
