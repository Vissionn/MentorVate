import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { CourseDetailHandler } from '../../../../Services/operation/CourseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { SetCourse, SetEditCourse } from '../../../../slices/courseSlice';
import RenderSteps from '../AddCourse/RenderSteps';

const EditCourse = () => {
    const location = useLocation()
    // console.log(location.pathname.split("/").at(-1));
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const {Course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const courseId = location.pathname.split("/").at(-1)

    // ess tarah s bhi id nikal skte h url m s, esko smjne k liye App.js m route ko jaa kr dekho,route k last m "/:courseId" bhi send kr rkhi h
    // const {courseId} = useParams()
    // console.log("ID",id);
    
    // console.log(courseId);

    useEffect(() => {
         (async() => {
            setLoading(true)
            try {
                const result = await CourseDetailHandler(courseId,token)
                //  console.log("result" , result);
                
                if(result) {
                    dispatch(SetCourse(result?.courseDetails))
                    dispatch(SetEditCourse(true))
                }
            } catch (error) {
                console.log("Unable to Fetch the Course Details",error.message);
                
            }
            setLoading(false)
        })()

        // CourseDetail()
    },[])

    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    
    
  return (
    <div>
    <h1 className='text-white'>Edit Course</h1>
    <div>
        {
            Course ? ( <RenderSteps/>) : (<p>Course Not Found</p>)
        }
    </div>

   
    </div>
  )
}

export default EditCourse