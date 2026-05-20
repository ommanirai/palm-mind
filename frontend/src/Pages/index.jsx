import { useEffect, useState, useRef } from "react"
import { socket } from "./../socket"
import { HttpClient } from "../Utils/HttpClient"
import { ErrorHandler } from "../Utils/ErrorHandler"
import { Authenticate } from "../Utils/Authenticate"
import { Link, useNavigate } from "react-router-dom"
import { Icons } from "../Utils/Icons"

export const Chat = () => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const user = Authenticate()
    const navigate = useNavigate()
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages])

    useEffect(() => {
        fetchChats()
        socket.on("user_joined", (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    type: "notification",
                    text: data
                }
            ])
        })
        socket.on("receive_message", (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    type: "message",
                    ...data
                }])
        })

        socket.emit("user_join", user?.full_name);

        return () => {
            socket.off("user_joined")
            socket.off("receive_message")
        }
    }, [])

    const fetchChats = () => {
        HttpClient.GET("/chat", true)
            .then((response) => {
                const formattedMessages = response.data.data.map((msg) => ({
                    ...msg,
                    type: "message",
                }))
                setMessages((prev) => [
                    ...formattedMessages,
                    ...prev,
                ])
            })
            .catch((error) => {
                ErrorHandler(error);
            });
    };

    const sendMessage = () => {
        socket.emit("send_message", {
            sender: user?._id,
            message
        })
        setMessage("")
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    }

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4 bg-blue-500 text-white p-5 rounded-lg">
                <div className="text-3xl">
                    Chat App
                </div>
                <div className="relative">
                    <div className="flex gap-2">
                        <span className="text-xl">{user.full_name}</span>
                        <span className="text-3xl hover:cursor-pointer" onClick={() => setShowMenu(!showMenu)}>{Icons.person}</span>
                    </div>
                    {
                        showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black border shadow-lg rounded-lg overflow-hidden z-50">
                                <div className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                    <Link to={`/user/${user._id}`} >
                                        Profile Details
                                    </Link>
                                </div>
                                <div className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                    <Link to={`/update/${user._id}`} >
                                        Update Profile
                                    </Link>
                                </div>
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
            <div className="border p-4 h-100 overflow-auto" ref={scrollRef}>
                {
                    messages?.map((msg, index) => (

                        msg.type === "notification"
                            ? (
                                <p
                                    key={index}
                                    className="text-center text-gray-500 text-sm my-2"
                                >
                                    {msg.text}
                                </p>
                            )
                            : (
                                <div key={index} className="mb-3">
                                    <b>{msg?.sender?.full_name || "deleted user"}</b>
                                    <p>{msg.message}</p>
                                </div>
                            )
                    ))
                }
            </div>

            <div className="flex gap-3 mt-4">
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-black text-white px-5"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    )
}