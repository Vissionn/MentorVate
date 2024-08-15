import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../Common/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, SetStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../Services/operation/CourseDetailsApi'
import { useNavigate } from "react-router-dom"

const PublishCourse = () => {

    const {register,handleSubmit,getValues,setValue,formState:{errors}} = useForm()
    const dispatch = useDispatch()
    const{token} = useSelector((state) => state.auth)
    const {Course} = useSelector((state) => state.course)
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        if(Course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public",true)
        }
    },[])

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const submitHandler = async(data) => {

       
        // check form is update or not
        if((Course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || 
           (Course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no need to make editcourse APi call
            // uppr wali  condition (Course?.status === COURSE_STATUS.PUBLISHED ) tb check hogi jb tumne ek brr course complete bna kr published kr diya hoga or uske bd Insturctor ke courses m jakr kese course ko dubara edit kr rhe hoge..to uss time Course?.status ke andar Published hoga to phle wali condition meet ho jayge.......first time jb tum course create kr rhe hoge to tum second wali condition m hi aaoge (Course?.status === COURSE_STATUS.DRAFT) kyuki starting m course k andar draft hi pda hoga........

            goToCourses()
            return

           }
        // console.log("Data",data);
        const formData = new FormData()
        const courseResult = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        console.log("courseId", Course?._id);
        
        formData.append("courseId", Course?._id)
        formData.append("status", courseResult)

        setLoading(true)
        const result = await editCourseDetails(formData,token)
        if(result) {
            goToCourses()
        }
        setLoading(false)
    }

    const goBack = () => {
        dispatch(SetStep(2))
    }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <h1 className="text-2xl font-semibold text-richblack-5">Publish Course</h1>
    <form onSubmit={handleSubmit(submitHandler)}>
    {/* checkbox */}
    <div className="my-6 mb-8 ">
        <label htmlFor='public' className="inline-flex items-center text-lg gap-x-4">
        <input
            type='checkbox'
            id='public'
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
        />
        <span className="ml-auto  max-w-max items-center  text-richblack-5">Make this Course as Public</span></label>
    </div>

    {/* prev button */}
    <div className='flex justify-end  items-center gap-x-4 '>
        <button className="flex justify-end cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900" type='button' onClick={goBack} disabled={loading}> Back</button>
        <IconButton btntxt="Save Changes" type="submit" disbaled={loading}/>
    </div>
    </form>
    </div>
  )
}

export default PublishCourse