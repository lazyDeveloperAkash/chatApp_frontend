'use client'
import React, { useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { asyncAvatar, asyncSingout, asyncUpdateUser } from '@/store/Actions/userActions';
import { useRouter } from 'next/navigation';

const Profile = (props) => {

    const { setProfile } = props;

    const user = useSelector(state => state.userReducers.user);

    const buttonRef = useRef(null);
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const router = useRouter();
    const [changePassword, setChangePassword] = useState(false);
    const [name, setName] = useState(user && user.name);
    const [contact, setContact] = useState(user && user.contact);
    const [email, setEmail] = useState(user && user.email);
    const [password, setPassword] = useState("");
    // for write button to input tag
    const [writeName, setWriteName] = useState(false);
    const [writeContact, setWriteContact] = useState(false);
    const [writeEmail, setWriteEmail] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        const user = {
            name: name,
            contact: contact,
            email: email
        }
        dispatch(asyncUpdateUser(user));
    }

    const clickHandler = () => {
        inputRef.current.click();
    }

    const avatarHandler = (e) => {
        e.preventDefault();
        if (!e.target) return;
        const formData = new FormData(e.target);
        formData.set("avatar", e.target.avatar.files[0]);
        if (formData) dispatch(asyncAvatar(formData));
    }

    const singOutHandler = async()=> {
        const res = await dispatch(asyncSingout());
        if(res) router.push("/");
    }

    return (
        <div className='absolute z-10 h-[100vh] w-[100vw] flex items-center justify-center bg-[#0000007f] overflow-hidden'>
            <div className='w-full md:w-[30vmax] rounded-2xl px-4 bg-black'>
                <div className='w-full flex justify-end p-4 pb-0'>
                    <div className='flex gap-4 items-center'>
                        <button className='px-4 py-2 rounded-3xl bg-red-500' onClick={singOutHandler}>SingOut</button>
                        <div onClick={() => setProfile(false)}><IoMdClose className='cursor-pointer' color='white' size={25} /></div>
                    </div>
                </div>
                <h1 className='text-white mx-5 text-2xl'>Profile</h1>
                <div className='w-full flex items-center justify-center'>
                    <form onSubmit={avatarHandler}>
                        <div onClick={clickHandler}>
                            <div className='h-[30vmax] w-[30vmax] md:h-[12vmax] md:w-[12vmax] rounded-full bg-green-400 cursor-pointer overflow-hidden bg-cover'>
                                <img className='h-full' src={user && user.avatar.url} />
                            </div>
                            <input ref={inputRef} className='w-0 h-0' type="file" onChange={() => buttonRef.current.click()} />
                            <button ref={buttonRef} className='h-0 w-0' type='submit'></button>
                        </div>
                    </form>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-3 w-full text-white">
                        {writeName ? (<div>
                            <label htmlFor="">Display Name</label>
                            <input className='w-full h-10 rounded-lg	px-3 py-2 mt-1 border-2 focus:border-[#4acd8d] focus:outline-none text-black' name='name' value={name} placeholder="John" type="text" onChange={(e) => setName(e.target.value)} />
                        </div>) : (<div className='flex items-center justify-between text-2xl'><h1>{name}</h1> <MdEdit className='cursor-pointer' onClick={() => { setWriteName(true); setIsDisabled(false) }} /> </div>)}
                        {writeContact ? (<div>
                            <label htmlFor="">Contact</label>
                            <input className='w-full h-10 rounded-lg	p-3 mt-1 border-2 focus:border-[#4acd8d] focus:outline-none text-black' name='contact' value={contact} placeholder="Enter Your Mobile Number" type="number" onChange={(e) => setContact(e.target.value)} />
                        </div>) : (<div className='flex items-center justify-between text-xl'><h1>{contact}</h1> <MdEdit className='cursor-pointer' onClick={() => { setWriteContact(true); setIsDisabled(false) }} /> </div>)}
                        {writeEmail ? (<div>
                            <label htmlFor="">Email</label>
                            <input className='w-full h-10 rounded-lg	p-3 mt-1 border-2 focus:border-[#4acd8d] focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-black' name='email' value={email} placeholder="Something@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>) : (<div className='flex items-center justify-between text-lg'><h1>{email}</h1> <MdEdit className='cursor-pointer' onClick={() => { setWriteEmail(true); setIsDisabled(false) }} /> </div>)}
                        <div className="flex items-center flex-col gap-2 my-3">
                            <button type='submit' disabled={isDisabled} className={`px-20 py-2 rounded-3xl ${isDisabled ? "bg-yellow-200 cursor-none" : "bg-yellow-300"}`}>Save Edit</button>
                            <div className='w-full flex justify-center'><p>Want to</p> <p onClick={() => setChangePassword(true)} className="text-red-500 cursor-pointer">Change Password</p></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile