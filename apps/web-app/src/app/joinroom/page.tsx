"use client"

import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

const JoinRoom = () => {

    const [roomName, setRoomName] = useState("")
    const [message, setMessage] = useState("")

    const router = useRouter()

    const handleClick = async () => {
        const response = await axios.get(`${BACKEND_URL}/room/${roomName}`)
        if (response.data) {
            setMessage("Redirecting to join room")
            redirect(`canvas/${response.data.id}`)
        }
    }

    const handleCreate = () => {
        router.push("/createroom")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Join a Room
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter a room name to join the session
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Room Name</label>
                        <input
                            type="text"
                            placeholder="Existing Room Name"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleClick}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-95"
                    >
                        Join Room
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">OR</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <button
                        onClick={handleCreate}
                        className="w-full py-3 px-4 bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all"
                    >
                        Create New Room
                    </button>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm text-center ${message.includes("Redirecting") ? "bg-blue-900/50 text-blue-200 border border-blue-800" : "bg-red-900/50 text-red-200 border border-red-800"}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;