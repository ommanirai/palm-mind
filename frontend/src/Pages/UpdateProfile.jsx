import React, { useEffect, useState } from 'react'
import { HttpClient } from '../Utils/HttpClient';
import { ErrorHandler } from '../Utils/ErrorHandler';
import { Notify } from '../Utils/Notify';
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfile = () => {
    const [data, setData] = useState({
        full_name: "",
        email: "",
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        HttpClient.PUT(`/user/${id}`, data)
            .then((response) => {
                Notify.ShowSuccess(response.data.msg);
                navigate("/user/profile");
            })
            .catch((error) => {
                ErrorHandler(error);
            });
    };

    return (
        <section className='w-full flex items-center justify-center min-h-screen p-6 bg-gray-50'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-8'>
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-extrabold text-gray-800'>
                        Update your profile
                    </h2>
                </div>

                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>
                            Full Name
                        </label>
                        <input
                            type='text'
                            name='full_name'
                            value={data.full_name}
                            onChange={handleChange}
                            placeholder='Enter your full name'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500' disabled
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 hover:cursor-pointer'
                    >
                        Update
                    </button>
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

export default UpdateProfile
