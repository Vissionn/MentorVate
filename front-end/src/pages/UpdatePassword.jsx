import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/operation/AuthApi';
import {AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BiArrowBack } from "react-icons/bi"

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
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose New Password</h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>

        <form onSubmit={submitHandler}>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password: <sup className="text-pink-200">*</sup></p>
            <input
              type={Showpassword ? "text" : "password"}
              required
              name="password"
              value={FormData.password}
              onChange={changeHandler}
              placeholder="Password"
              className="form-style w-full !pr-10"
            />

            <span
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              onClick={() => {
                SetShowPassword((prev) => !prev);
              }}
            >
              {Showpassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative mt-3 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Confirm Password:  <sup className="text-pink-200">*</sup></p>
            <input
              type={ShowconfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={FormData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm-Password"
             className="form-style w-full !pr-10"
            />

            <span
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              onClick={() => {
                SetShowConfirmPassword((prev) => !prev);
              }}
            >
              {ShowconfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <button type="submit"  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
        </form>

        <div className="mt-6 flex items-center justify-between" >
          <Link to={"/login"} className="flex items-center gap-x-2 text-richblack-5">
          <BiArrowBack/>
          Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword