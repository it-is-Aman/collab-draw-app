"use client"

import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { redirect } from "next/navigation";


const AuthPage = ({ isSignin }: { isSignin: boolean }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handlesignin = async () => {
        const res = await axios.post(`${BACKEND_URL}/signin`, {
            username: email,
            password: password
        }, {
            withCredentials: true, // Important: Send/receive cookies
        })
        // console.log(res.data);
        if (res.data.success) {
            setMessage(res.data.success)
            redirect("/joinroom")
        }
        setMessage(res.data.message)
    }
    const handlesignup = async () => {
        const res = await axios.post(`${BACKEND_URL}/signup`, {
            username: email,
            password: password,
            name: name
        })
        // console.log(res.data);
        if (res.data.success) {
            setMessage(res.data.success)
            redirect("/signin")
        }
        setMessage(res.data.message)

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        {isSignin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        {isSignin ? "Sign in to access your drawings" : "Join us and start creating today"}
                    </p>
                </div>

                <div className="space-y-4">
                    {!isSignin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="text"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={isSignin ? handlesignin : handlesignup}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-95"
                    >
                        {isSignin ? "Sign In" : "Sign Up"}
                    </button>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm text-center ${message.includes("success") ? "bg-green-900/50 text-green-200 border border-green-800" : "bg-red-900/50 text-red-200 border border-red-800"}`}>
                            {message}
                        </div>
                    )}
                </div>

                <div className="text-center text-sm text-gray-500">
                    {isSignin ? "Don't have an account? " : "Already have an account? "}
                    <a href={isSignin ? "/signup" : "/signin"} className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                        {isSignin ? "Sign up" : "Sign in"}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;