import React, { useEffect, useState } from 'react'
import { HttpClient } from '../Utils/HttpClient'
import { ErrorHandler } from '../Utils/ErrorHandler'
import { Icons } from '../Utils/Icons'
import { Notify } from '../Utils/Notify'
import { Link, useNavigate } from 'react-router-dom'
import { Authenticate } from '../Utils/Authenticate'

export const ViewUser = () => {
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState({})
    const user = Authenticate()
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        HttpClient.GET(`/user`, true)
            .then(res => {
                setUsers(res.data.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })

        HttpClient.GET(`/chat/stats`, true)
            .then(res => {
                setStats(res.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })
    }, [])

    const handleDelete = (e, id, index) => {
        let confirmation = window.confirm("Are you sure you want to delete this user?");
        if (confirmation) {
            HttpClient.DELETE(`/user/${id}`, true)
                .then(res => {
                    Notify.ShowSuccess(res.data.msg);
                    var deletedUser = users.splice(index, 1);
                    setUsers(users.filter(u => u._id !== deletedUser[0]._id));
                })
                .catch(err => {
                    ErrorHandler(err)
                })
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    }

    return (
        <div className='p-10'>
            <div className="flex items-center justify-between mb-4 bg-blue-500 text-white p-5 rounded-lg">
                <div className="text-3xl font-bold">
                    Chat App Dashboard
                </div>
                <div className="text-2xl">
                    Total Users: {stats.totalUsers || 0}
                </div>
                <div className="text-2xl">
                    Total Messages: {stats.totalChats || 0}
                </div>
                <div className="relative">
                    <div className="flex gap-2">
                        <span className="text-xl">{user.full_name}</span>
                        <span className="text-3xl hover:cursor-pointer" onClick={() => setShowMenu(!showMenu)}>{Icons.person}</span>
                    </div>
                    {
                        showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg overflow-hidden z-50">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <table className='w-full text-sm text-left mt-5 cursor-pointer'>
                <thead className='text-xs uppercase bg-gray-500'>
                    <tr>
                        <th className='px-6 py-3'>S.N.</th>
                        <th className='px-6 py-3'>Full Name</th>
                        <th className='px-6 py-3'>Email</th>
                        <th className='px-6 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => (
                            <tr key={index} className='bg-white border-b hover:bg-gray-50'>
                                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</td>
                                <td className='px-6 py-4'>{user.full_name}</td>
                                <td className='px-6 py-4'>{user.email}</td>
                                <td className='px-6 py-4 flex items-center'>
                                    <button onClick={(e) => { handleDelete(e, user._id, index) }} className='text-red-500 text-lg cursor-pointer'>{Icons.delete}</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}