import React, { useState } from 'react'
import {AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login } from '../../../Services/operation/AuthApi'

const LoginForm = ({setIsLoggedIn , isLoggedIn}) => {

    const [formData , SetformData] = useState( {
        email: "" , password : ""
    }) 

    const [showPassword , SetshowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch =  useDispatch()

    const {email,password} = formData;

    function changeHandler(event) {
        SetformData( (prevData) => (
            {
                ...prevData , [event.target.name] : event.target.value
            }
        ))
    }

    function clickHandler() {
        SetshowPassword((prev) => (!prev))
    }

    function submitHandler(event) {
        event.preventDefault()
        // setIsLoggedIn((prev) => (!prev))
        dispatch(login(email,password,navigate,dispatch));
        // toast.success("Logged In")
        // navigate("/dashboard")
    }

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6">
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address
            <sup className='text-pink-200'>*</sup></p>

            <input 
            required
            name='email'
            type='email'
            value={formData.email}
            onChange={changeHandler}
            placeholder='Enter Email-id' 
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>password
            <sup className='text-pink-200'>*</sup></p>

            <input 
            required
            name='password'
            type={showPassword ? ("text") : ("password")}
            value={formData.password}
            onChange={changeHandler}
            placeholder='Enter Password'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' />

             <span className='absolute right-3 top-[38px] cursor-pointer'
              onClick={clickHandler}>
                        {showPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :

                          (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
             </span>
             
                    <Link to ="/forgot-password">
                        <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>Forgot Password</p>
                    </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign In
        </button>
        
    </form>
  )
}

export default LoginForm