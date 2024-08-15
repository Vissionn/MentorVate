import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from "react-hook-form"
import { ChangeProfileDetails } from '../../../../Services/operation/SettingApi';
import IconButton from '../../../Common/IconButton';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const {user,editProfile} = useSelector((state) => state.profile);
     console.log("user", user);
     console.log("edit",editProfile);
     
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const {register
        ,handleSubmit
        ,formState:{errors, isSubmitSuccessful}
        ,reset,setValue } = useForm()

    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                firstName:"",
                lastName: '',
                dateOfBirth: "",
                gender: "",
                contactNumber: "",
                about : '',
            })
        }

    },[reset, isSubmitSuccessful])

    useEffect(() => {
      if(editProfile) {
        setValue("firstName",user?.firstName)
        setValue("lastName",user?.lastName)
        setValue("dateOfBirth",user?.additionalDetails?.dateOfBirth)
        setValue("gender",user?.additionalDetails?.gender)
        setValue("contactNumber",user?.additionalDetails?.contactNumber)
        setValue("about",user?.additionalDetails?.about)
      }
    },[])

    const submitProfileForm = (data) => {
        try {
            dispatch(ChangeProfileDetails(data,token,Navigate))
            reset(data)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* profile Info */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  // required: {
                  //   value: true,
                  //   message: "Please enter your Date of Birth.",
                  // },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
              
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender")}
                
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  // required: {
                  //   value: true,
                  //   message: "Please enter your Contact Number.",
                  // },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about")}
               
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className='flex gap-x-4 items-end justify-end'>
        <button onClick={() => {Navigate("/dashboard/my-profile")}}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >Cancel</button>
        <IconButton btntxt={"Save"}
         type={"submit"}
         >
        </IconButton>
        </div>
        
        
        </form>
    </>
  )
}

export default EditProfile