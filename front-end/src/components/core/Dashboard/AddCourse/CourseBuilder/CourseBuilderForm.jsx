import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CourseBuilderSection from './Section'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { CreateSectionHandler, EditSectionHandler } from '../../../../../Services/operation/CourseDetailsApi';
import { SetCourse, SetEditCourse, SetStep } from '../../../../../slices/courseSlice';
import IconButton from '../../../../Common/IconButton';
import { MdNavigateNext } from "react-icons/md"
import toast from 'react-hot-toast';


const CourseBuilderForm = () => {

  const {register,handleSubmit,setValue,formState:{errors}} = useForm()
  // const [Show, SetShow] = useState(false)
  // const [section, SetSection] = useState([])
  const [Editsection , SetEditSection] = useState(false)
  const [loading , setLoading] = useState(false)

  const {Course,editCourse} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const courseId = Course?._id
  const [SectionId , SetSectionId] = useState("")
  // console.log("CourseId",courseId);
  const {token} = useSelector((state) => state.auth)

  const editClickHandler = (sectionName,sectionId) => {
    console.log("event" ,sectionName, sectionId);
    SetSectionId(sectionId)
    setValue('sectionName', sectionName)
    SetEditSection(true)
   }

  const submitHandler = async(data) => {
    if(data){ 

      let result;
      setLoading(true)
      if(Editsection) {
        result = await EditSectionHandler({sectionName:data.sectionName, createdSectionId:SectionId, courseId:courseId} , token)
        setValue('sectionName' , "")
      }
      else {
        result = await CreateSectionHandler(data.sectionName,courseId,token)
        setValue('sectionName' , "")
      // SetShow(true)
      }

      // dono m s jha s bhi result aa rha hoga vhi result Course slice k andar set ho jayega
      if(result){
        // console.log("result",result);
        //  console.log("Before Course",Course);
       const response = dispatch(SetCourse(result))
       console.log("response",response);
       SetEditSection(false)
       
      }

      setLoading(false)
       
    }
   
  }

  const goBack = () => {
    dispatch(SetEditCourse(true))
    dispatch(SetStep(1))
  }

  const goToNext = () => {
    if(Course.courseContent.length === 0) {
      toast.error("Please add at Least one Section")
      return
    }
    if(Course.courseContent.some((section) => section.SubSection.length === 0)) {
      toast.error("Please add at Least one Sub-Section")
      return
    }
    dispatch(SetStep(3))
  }

  
  useEffect(() =>{
    submitHandler()
  },[])


  // console.log("After Course",Course);

  return (
    <div className='text-white bg-richblack-800 px-4 py-4 rounded-lg'>
    <h1 className=' text-white text-3xl font-bold font-inter pb-8'>Course Builder</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
      <div className='flex flex-col gap-y-2'>
      <label className='lable-style' htmlFor='sectionName'> Section Name:</label>
        <input
          id='sectionName'
          placeholder='Add Section Name'
          className='form-style'
          {...register("sectionName", {required:true})}
        />
      </div>
       
       <div className='flex gap-x-3 items-center'>
       <button className=' bg-richblack-600 border border-yellow-50 px-2 py-3 w-fit rounded-lg text-center mt-4 text-yellow-300 flex items-center justify-center gap-x-1 text-lg font-bold font-mono' type='submit'>
        {Editsection ? "Edit Section" : "Create Section"}
        <MdOutlineAddCircleOutline className=' text-yellow-100'/>
       </button>
       {Editsection && <button className=' underline text-richblack-300 mt-10' 
       onClick={(e) => {
        SetEditSection(false)
        setValue('sectionName' , "")
        }}>Cancel Edit</button>}
       </div>
   

        {errors.sectionName && <span>Section Name is Required</span>}
      </form>

      {/* section Component */}
      {
        Course?.courseContent?.length > 0 && (
        <div>
          <CourseBuilderSection 
            editClickHandler = {editClickHandler}
          />
        </div>
        )
      }

      {/* Next and Prev Button */}
      <div className="flex justify-end gap-x-3 mt-4">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconButton btntxt="Next" btnHandler={goToNext}>
          <MdNavigateNext />
        </IconButton>
      </div>
    
      
    </div>
  )
}

export default CourseBuilderForm