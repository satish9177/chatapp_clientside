import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import uploadFile from '../uploadimage/upload';
import { MdClose } from "react-icons/md";
import toast from 'react-hot-toast'
import URL from '../api';
const Register = () => {
  const [pt,setpt]=useState(false);
  const nav=useNavigate()
  const [data,setdata]=useState({
    username:'',
    email:'',
    password:'',
    profile_pic:""
  })
  
    const fetched=async(e)=>{
      e.preventDefault();
      if(data.username.length===0) {
        toast('enter username');
        return;
      }
      if(data.email.length===0){
        toast('enter email');
        return;
      }
      if(data.password.length===0){
        toast('enter password');
        return;
      } 
      
      await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:data.username,
          email:data.email,
          password:data.password,
          profile_pic:data.profile_pic
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("success");
            toast.success("registered successfully")
            // alert("registered successfully");
            setpt(false)
            setdata({
              username:'',
              email:'',
              password:'',
              profile_pic:""
            })
            nav('/email')
          } else {
            console.log("Failed");
            toast.error("registered failed");
          }
         return res.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          console.log('api not fetch',err);
          alert("api not fetch");
        });
     
  }
  const Uploadphoto=async (e)=>{
    console.log(e.target.files[0]);
    e.stopPropagation();
    const photo=await uploadFile(e.target.files[0])
     console.log(photo.url)
    setdata({...data,profile_pic:photo.url})
    setpt(true);
  }
  // console.log(data)
  const Deletephoto=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setpt(false)
    setdata({...data,profile_pic:''})
  }
  return (
   <div className='flex flex-col justify-center items-center w-screen'>
    <form className='flex flex-col border-2 p-6  mx-96 my-5 w-96' onSubmit={fetched}>
      <h1 className='text-2xl text-center'>Welcome to chat app</h1>
      <label htmlFor='name'>Name:</label>
      <input type='text' id='name' placeholder='enter your name' value={data.username} onChange={(e)=>setdata({...data,username:e.target.value})} className='w-full border-2 border-green-200 outline-emerald-400 p-2' />
      <label htmlFor='email'>Email:</label>
      <input type='text' id='email' placeholder='enter your email ' value={data.email} onChange={(e)=>setdata({...data,email:e.target.value})} className='border-2 border-green-200 outline-green-300 p-2' />
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' placeholder='enter your password' value={data.password} onChange={(e)=>setdata({...data,password:e.target.value})} className='border-2 border-green-200 outline-green-300 p-2' />
      <h1>Photo:</h1>
      <label htmlFor='profilepic'>
        <div className='flex justify-center border-2 py-2 cursor-pointer border-green-200 '>
         { !pt? 'Upload Profile Photo':(<div className=' flex items-center'><div>{data.username}.png</div> <button className='mx-2' onClick={Deletephoto}><MdClose /></button></div>)}
        </div>
      </label>
      <input type='file' id='profilepic' className=' hidden' onChange={Uploadphoto} />
      <button type='submit' className=' my-2 py-2 border-2 cursor-pointer rounded-sm text-white text-lg bg-blue-600 hover:bg-blue-500'>Register</button>
      <div><span className='mr-2'>Already have an account?</span><Link to='/email' className=' hover:text-blue-700 font-semibold text-black'>SignIn</Link></div>
      </form>
      
   </div>
  )
}

export default Register