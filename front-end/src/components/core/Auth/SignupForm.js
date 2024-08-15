import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../../../Services/operation/AuthApi'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { setSignupData } from '../../../slices/authSlice'



const SignupForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const [formData , SetformData] = useState( {
        FirstName: "" , LastName : "" ,email :"" ,
        password : "" , confirmPassword : ""
    })

   
   
    const [showPassword , SetshowPassword] = useState(false)

    const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {FirstName,LastName,email,password,confirmPassword} = formData;

    function changeHandler(event) {
        SetformData( (prevData) => (
            {...prevData , [event.target.name] : event.target.value}
        ))
    }

    
    function submitHandler(event) {
        event.preventDefault()
        if (formData.password != formData.confirmPassword) {
            toast.error("Password do not match")
            return;
        }
        const accountData = {
            ...formData
        }

        const finalData = {
            ...accountData , 
            accountType
        }
        // console.log(finalData);


        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(finalData))


        // Send OTP to user for verification
        dispatch(sendOtp(formData.email,navigate))


        // toast.success("Successfullly Sign-up")
        // Reset
        //     SetformData({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
        //   })
        //   setAccountType(ACCOUNT_TYPE.STUDENT)
    
     // Reset
     SetformData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    
    
  return (
    <div>
        <div  className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
        <button
            className={`${accountType === "Student" 
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={()=> setAccountType("Student")}>
                Student
            </button>

            <button
            className={`${accountType === "Instructor" 
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("Instructor")}>
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler}>

        {/* This div is for First and Last Name */}
        <div className='flex gap-x-4 mt-[20px]'> 
        <label className='w-full'>
                <p  className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First-Name <sup className='text-pink-200'>*</sup></p>
                <input 
                required
                type='text'
                placeholder='FirstName'
                name='FirstName'
                value={formData.FirstName}
                onChange={changeHandler}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>

            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                <input 
                required
                type='text'
                placeholder='LastName'
                name='LastName'
                value={formData.LastName}
                onChange={changeHandler}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>
        </div>
            

           {/* label for email */}
           <div  className='mt-[20px]'>
           <label className='w-full mt-[20px]'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>
                <input 
                required
                type='email'
                placeholder='email'
                name='email'
                value={formData.email}
                onChange={changeHandler}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>
           </div>
           

            {/*  This div is for Password and Confirm Password*/}
            <div className='w-full flex gap-x-4 mt-[20px]'>

            <label  className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                <input 
                required
                type={showPassword ? ("text") : ("password")}
                placeholder='password'
                name='password'
                value={formData.password}
                onChange={changeHandler}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />

                <span 
                className='absolute right-3 top-[38px] cursor-pointer' 
                onClick={() => {SetshowPassword((prev) => (!prev))}} >

                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>

            </label>

            <label className='w-full relative'>

                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>confirm Password<sup className='text-pink-200'>*</sup></p>
                <input 
                required
                type={showConfirmPassword ? ("text") : ("password")}
                placeholder='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={changeHandler}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />

               <span 
                className='absolute right-3 top-[38px] cursor-pointer'
               onClick={() => {setShowConfirmPassword((prev) => (!prev))}}>
                        {showConfirmPassword ? (<AiOutlineEyeInvisible  fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
               </span>

            </label>


            </div>
            

            <button  className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Create Account
            </button>
        </form>
    </div>

  )
}


export default SignupForm