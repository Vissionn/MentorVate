import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryCode from "../../../data/countrycode.json"

const ContactForm = () => {

    const[loading , setLoading]= useState(false)
   const { register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }} =  useForm()

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                firstName:"",
                lastName: '',
                email: "",
                message: "",
                phoneNo : ''
            })
        }

    },[reset, isSubmitSuccessful])

    const SubmitContact = async(data) => {
        console.log("Contact" , data);
        setLoading(true)
        const response = {status:"OK"}
        console.log("resposne" , response);
        setLoading(false)
    }

  return (
    <form onSubmit={handleSubmit(SubmitContact)}>
      <div className="flex flex-col  gap-y-5 max-w-maxContent ">
        <div className="flex flex-col lg:flex-row gap-x-6">
          {/* First Name */}
          <div className='flex flex-col lg:w-[50%] gap-y-2'>
         
            <label htmlFor="firstName" className='lablestyle'>First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className='form-style'
              {...register("firstName", { required: true })}
            />
            
          
       
          {errors.firstName && <span className=" text-[12px] text-yellow-100">Please Enter Your First Name</span>}
          
        
          </div>
          

          {/* Last Name */}
          <div className='flex flex-col lg:w-[50%] gap-y-2'>
            <label htmlFor="lastName" className='lablestyle'>Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
               className='form-style'
              {...register("lastName")}
            />
          </div>
        </div>

      
        <div className="flex flex-col gap-y-8">

        {/* email */}
          <div className='flex flex-col gap-y-2'>
            <label className='lablestyle'>Email:</label>
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Email"
              className='form-style'
              {...register("Email", { required: true })}
            />
            {errors.Email && <span className=" text-[12px] text-yellow-100">Please enter your Email</span>}
          </div>

          {/* phone no. */}
          <div className='flex flex-col gap-y-2'>
          <label htmlFor='phonenumber' className='lablestyle'>Phone Number:</label>

         
          <div className='flex flex-row gap-3'>
         
         <select 
         name='dropdown'
         id='dropdown'
         className='form-style w-[15%] '
         {...register("CountryCode", {required:true})}>
             {
                 countryCode.map((code,index)=> {
                     return (
                         <option key={index} className='text-black'>
                         {`${code.code}-${code.country}`}
                         </option>

                     )
                 })
             }
         </select>
      

         <input 
             type='tel'
             name='number'
             id='number'
             placeholder='Enter your Number'
             className='form-style w-[95%]'
             {...register("number", 
             {
                 required:{value:true, message:"Please Enter your Number"},
                 maxLength:{value:10,message:"Invalid Phone Number"},
                 minLength:{value:8, message:"Invalid Phone Number"}
             })}
         />
  
       
       </div>
          <div className='ml-24'>
          {errors.number && <span className=" text-[12px] text-yellow-100">{errors.number.message}</span>}
          </div>
          
          </div>

          {/* Message */}
          <div className='flex flex-col gap-y-2'>
            <label className='lablestyle'>Message:</label>
            <textarea
                name='message'
                id='message'
                cols="30"
                rows="7"
                placeholder='Enter Your Message'
                 className='form-style'
                {...register("message", {required:true})}
            />
            {errors.message && <span className=" text-[12px] text-yellow-100">Please Enter Message</span>}
          </div>
        </div>

        <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
      </div>
    </form>
    
  );
}

export default ContactForm