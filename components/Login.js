"use client"
import React, { useEffect, useState } from 'react'
import Forget from './Forget';
import { useDispatch, } from 'react-redux';
import { asyncSinginEmail, asyncSinginNumber } from '@/store/Actions/userActions';
import { useRouter } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

const Login = ({setLogin, setLoader}) => {

    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [loginFeature, setLoginFeature] = useState(false);
    const [forgetPass, setForgetPass] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const loginSubmitHandler = async(e) => {
        e.preventDefault();
        if(!email && !password && !contact) return;
        setLoader(true)
        if (loginFeature) {
            const user = {
                email: email,
                password: password
            }
            const res = await dispatch(asyncSinginEmail(user));
            setLoader(false)
            if(res) router.push("/auth");
            return
        } else {
            const user = {
                contact: contact,
                password: password
            }
            const res = await dispatch(asyncSinginNumber(user));
            console.log(res)
            setLoader(false)
            console.log("first")
            router.push("/auth");
            return
        }
    }


    return (
        <>
            <div className={`absolute top-0 w-full z-10 h-[100vh] flex items-center justify-center bg-[#0000001a]`}>
                <div className={`w-[11/12] md:w-[60vmax] lg:w-[30vmax] bg-white p-3 flex flex-col items-center gap-8 border rounded-xl shadow-lg shadow-[#4acd8d]`}>
                    <div className="flex items-center justify-end w-full">
                        <div onClick={() => setLogin(false)} className='cursor-pointer'><IoMdClose size={25} /></div>
                    </div>
                    <h1 className="text-[6vmax] md:text-[2vmax]">Login</h1>
                    <div className="flex items-center gap-4 mt-1">
                        <div>
                            <label>Contact</label>
                            <input className="ml-2" type="radio" name="loginType" checked={loginFeature === false} onChange={() => setLoginFeature(false)} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input className="ml-2" type="radio" name='loginType' onChange={() => setLoginFeature(true)} />
                        </div>
                    </div>
                    <form onSubmit={loginSubmitHandler}>
                        <div className="w-full flex flex-col gap-5">
                            {loginFeature ? <div>
                                <label htmlFor="">Email</label>
                                <input className='w-full h-10 rounded-lg	p-3 mt-1 border-2 focus:border-[#4acd8d] focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' name='email' placeholder="Something@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />
                            </div> : <div>
                                <label htmlFor="">Contact</label>
                                <input className='w-full h-10 rounded-lg	p-3 mt-1 border-2 focus:border-[#4acd8d] focus:outline-none' name='contact' placeholder="Enter Your Mobile Number" maxLength="10" type="text" onChange={(e) => setContact(e.target.value)} />
                            </div>}
                            <div>
                                <label htmlFor="">Password</label>
                                <input className='w-full h-10 rounded-lg	p-3 mt-1 border-2 focus:border-[#4acd8d] focus:outline-none' name='password' placeholder="Password must be Strong" type="password" onChange={(e) => setPassword(e.target.value)} />
                                <div className="w-full flex justify-end mt-2"><p className="text-cyan-400 cursor-pointer" onClick={() => setForgetPass(true)} >Forgot Password?</p></div>
                            </div>
                            <div className="flex items-center flex-col gap-2 my-3">
                                <button type='submit' className={`px-20 py-2 rounded-3xl bg-[#4acd8d]`}>Login</button>
                                <div className='flex justify-center'><h3>New User?</h3><p onClick={() => setLogin(false)} className="text-cyan-400 cursor-pointer">Register</p></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {forgetPass ? <Forget setForgetPass={setForgetPass} /> : ""}
        </>
    )
}

export default Login