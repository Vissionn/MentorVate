import React from 'react'
import { GoPlus } from "react-icons/go";
import InstructorCourse from './InstructorCourse';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
    const navigate = useNavigate()

    const gotoAddCourse = () => {
        navigate("/dashboard/add-course")
    }

  return (
    <div className='w-11/12 flex flex-col gap-y-16'>
        <div className='flex justify-between'>
            <h1 className=' text-white text-3xl font-inter font-medium'>MyCourses</h1>
            <button className=' bg-yellow-100 py-3 px-2 rounded-lg text-center flex items-center transition-all duration-200 hover:bg-white hover:text-black' onClick={gotoAddCourse}>
            Add Course
            <GoPlus/>
            </button>
        </div>

        <div>
            <InstructorCourse/>
        </div>
    </div>
  )
}

export default MyCourses