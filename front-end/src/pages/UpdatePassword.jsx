import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/operation/AuthApi';
import {AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdatePassword = () => {

    const [FormData , SetFormData] = useState({
        password: "",
        confirmPassword: "",
      })
    const [Showpassword , SetShowPassword] =  useState(false);
    const [ShowconfirmPassword , SetShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {password , confirmPassword} = FormData;

    const changeHandler = (e) => {
        SetFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            toast.error("Password do not matched")
            return;
        }
       const token =  location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
    }

  return (
    <div className='text-white '>
        <h1>Choose New Password</h1>
        <p>Almost done. Enter your new password and youre all set.</p>

        <form onSubmit={submitHandler}>
            <label>
                <p>New Password:</p>
                <input type= {Showpassword ? "text" : "password"}
                    required
                    name='password'
                    value={FormData.password}
                    onChange={changeHandler}
                    placeholder='Password'
                    className='w-full p-4 text-richblue-50 bg-richblack-700'
                />

                   <span 
                     className=''
                     onClick={() => {SetShowPassword((prev) => (!prev))}}>
                        {Showpassword ? (<AiOutlineEyeInvisible  fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                  </span>
            </label>

            <label>
                <p>Confirm Password:</p>
                <input type={ShowconfirmPassword ? "text" : "password"}
                    required
                    name='confirmPassword'
                    value={FormData.confirmPassword}
                    onChange={changeHandler}
                    placeholder='Confirm-Password'
                    className='w-full p-4 text-richblue-50 bg-richblack-700'
                />

                <span 
                     className=''
                     onClick={() => {SetShowConfirmPassword((prev) => (!prev))}}>
                        {ShowconfirmPassword ? (<AiOutlineEyeInvisible  fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
               </span>
            </label>

            <button type='submit'>
                Reset Password
            </button>
            
        </form>

        <div>
        <Link to={"/login"}>
            Back to Login
        </Link>
        </div>
    </div>
  )
}

export default UpdatePassword