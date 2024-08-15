import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../Common/IconButton';
import { useNavigate } from 'react-router-dom';
import { BuyCourseHandler } from '../../../../Services/operation/StudentFeaturesApi';


const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    // console.log("user",user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading , SetLoading] = useState(false)
    
    

    const HandleBuyCourse = async() => {
      SetLoading(true)
      const courses = cart.map((course) => course._id);
      // y courses phle hi ek array return hoga to simple hi bhejenge esko...agr esko phr s array m krke bhejenge to double array ho jayega....X[courses]X.... right---->courses
      // console.log("Bought these course:", courses);
      try {
        if(token) {
          const result = await BuyCourseHandler(courses,user,dispatch,navigate,token)
          SetLoading(false)
          return
        } 
        // else {
        //   setConfirmationModal({
        //     text1: "You are not logged in!",
        //     text2: "Please login to Purchase Course.",
        //     btn1Text: "Login",
        //     btn2Text: "Cancel",
        //     btn1Handler: () => navigate("/login"),
        //     btn2Handler: () => setConfirmationModal(null),
        //   })
        // }
          
      } catch (error) {
          console.log("error while buying the Course", error.message);
          
      }
  
  }

    // const handleBuyCourse = () => {
        
    //     
    //     //TODO: API integrate -> payment gateway tak leke jaegi
    // }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

    <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
    <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>

    <IconButton 
    disbaled={loading}
        btntxt="Buy Now"
        btnHandler={HandleBuyCourse}
        customClasses="w-full justify-center"
    />
    
</div>
  )
}

export default RenderTotalAmount