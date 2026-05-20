import React, { useState } from 'react'
import { HttpClient } from '../Utils/HttpClient';
import { ErrorHandler } from '../Utils/ErrorHandler';
import { Notify } from '../Utils/Notify';
import { useNavigate } from "react-router-dom";

const defaultForm = {
    email: "",
    password: "",
};

const SignIn = () => {
    const [data, setData] = useState({ ...defaultForm });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        HttpClient.POST("/auth/signin", data)
            .then((response) => {
                let user = response.data;
                Notify.ShowSuccess("SignIn successfull.");
                localStorage.setItem("token", user.token);
                localStorage.setItem("user", JSON.stringify(user.data));
                if (user.data.role === "admin") {
                    navigate("/admin/dashboard");
                }
                else {
                    navigate("/user/profile");
                }
            })
            .catch((error) => {
                ErrorHandler(error);
            });
    };

    return (
        <section className='w-full flex items-center justify-center min-h-screen p-6 bg-gray-50'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-8'>
                <div className='text-center mb-8'>
                    <h2 className='text-5xl font-extrabold text-gray-800'>
                        Sign In
                    </h2>
                    <p className='mt-3 text-gray-500'>
                        Sign in to continue
                    </p>
                </div>

                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            placeholder='Enter your email'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 hover:cursor-pointer'
                    >
                        Sign In
                    </button>
                </form>

                <p className='mt-6 text-center text-sm text-gray-500'>
                    Don't have an account?
                    <a href='/signup' className='ml-1 text-blue-600 hover:underline'>
                        Sign up
                    </a>
                </p>
            </div>
        </section>
    )
}

export default SignIn
