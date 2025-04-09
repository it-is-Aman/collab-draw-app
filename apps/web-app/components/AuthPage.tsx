"use client"

import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";


const AuthPage = ({ isSignin }: { isSignin: boolean }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlesignin = async () => {
        const res = await axios.post(`${BACKEND_URL}/signin`, {
            username: email,
            password: password
        }, {
            withCredentials: true, // Important: Send/receive cookies
        })
        // console.log(res.data);
    }
    const handlesignup = async () => {
        const res = await axios.post(`${BACKEND_URL}/signup`, {
            username: email,
            password: password,
            name: name
        })
        // console.log(res.data);
    }

    return (
        <div>
            {!isSignin && <div>
                name<input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </div>}
            <div>
                email<input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                password<input type="text" placeholder="Email" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={isSignin ? handlesignin : handlesignup}>{isSignin ? "signin" : "signup"}</button>

        </div >
    );
}

export default AuthPage;