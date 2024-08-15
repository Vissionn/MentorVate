import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../Services/operation/SettingApi'
import {AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"
import IconButton from '../../../Common/IconButton'
import toast from 'react-hot-toast'

const ChangePassword = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    // console.log("user",user);
    const Navigate = useNavigate()

    const [showPassword, SetshowPassword] = useState(false)
    const [showNewPassword, SetshowNewPassword] = useState(false)

    const {handleSubmit,
        register,
        formState:{errors, isSubmitSuccessful},
        reset} = useForm()

        const dispatch = useDispatch();

        const PasswordChangeHandler = async(data) => {
            try {
                // dispatch(ChangePasswordHandler(data,token,Navigate))
                 dispatch(changePassword(data,token,Navigate))
                console.log("Password-data",data);
            } catch (error) {
                console.log("ERROR MESSAGE - ", error.message)
            }
        }

        useEffect(() => {
            if(isSubmitSuccessful) {
                reset({
                    oldPassword : "",
                    newPassword: "",
                })
            }
    
        },[reset, isSubmitSuccessful])

     
        
  return (
    <div>
       <form onSubmit={handleSubmit(PasswordChangeHandler)}>
       <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
       <h1 className='text-white'>Password</h1>
      
         
          <div className='flex lg:flex-row flex-col gap-5'>
           {/* current password  */}
           <div className='relative flex flex-col lg:w-[50%] gap-2'>
           <label htmlFor='oldPassword'>Current Password</label>
            <input
                required
                type={showPassword ? ("text") : ("password")}
                placeholder='old-Password'
                name='oldPassword'
                id='oldPassword'
                className="form-style relative"
                {...register("oldPassword", {required:true})}
            />
            {errors.password && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
              <span 
                className='absolute right-3 top-[42px] cursor-pointer' 
                onClick={() => {SetshowPassword((prev) => (!prev))}} >

                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>
           </div>

            {/* New Password  */}
           <div className='relative flex flex-col lg:w-[50%] gap-2'>
           <label htmlFor='newPassword'>New Password</label>
            <input
                required
                type={showNewPassword ? ("text") : ("password")}
                placeholder='new-Password'
                name='newPassword'
                id='newPassword'
                className="form-style relative"
                {...register("newPassword", {required:true})}
            />
            {errors.Newpassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
              <span 
                className='absolute right-3 top-[42px] cursor-pointer' 
                onClick={() => {SetshowNewPassword((prev) => (!prev))}} >

                        {showNewPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>
           </div>
           </div>
           
           </div>
           <div className='flex gap-x-4 items-end justify-end'>
        <button onClick={() => {Navigate("/dashboard/my-profile")}}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >Cancel</button>
        <IconButton btntxt={"Update"}
         type={"submit"}
         >
        </IconButton>
              </div>

          </form>
         

      

       
    </div>
  )
}

export default ChangePassword

