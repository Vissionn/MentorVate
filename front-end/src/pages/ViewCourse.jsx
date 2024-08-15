import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CourseDetailHandler } from '../Services/operation/CourseDetailsApi'
import { Outlet } from 'react-router-dom'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/ViewCourseSlice'
import VideoDetailSideBar from '../components/core/ViewCourse/VideoDetailSideBar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'


const ViewCourse = () => {
    const [reviewModal , SetReviewModal] = useState(false)
    const {token} = useSelector((state) => state.auth)
    const {courseId} = useParams()
    const dispatch = useDispatch()
    

    useEffect(() => {
        const CourseSpecificDetails = async() => {
            try {
                const res = await CourseDetailHandler(courseId,token)
                if(res) {
                    dispatch(setCourseSectionData(res?.courseDetails?.courseContent))
                    dispatch(setEntireCourseData(res?.courseDetails))
                    let lecture = 0;
                    res?.courseDetails?.courseContent.forEach((section) => {
                      lecture +=  section?.SubSection.length
                    })
                    dispatch(setTotalNoOfLectures(lecture))
                    dispatch(setCompletedLectures(res?.completedVideos))
                }

            } catch (error) {
                console.log("Unable to Fetch the Courde Details", error.message);
                
            }
        }
        CourseSpecificDetails()
    },[])
  return (
    <div className='relative flex sm:flex-row flex-col sm:min-h-[calc(100vh-3.5rem)]'>
        <VideoDetailSideBar SetReviewModal={SetReviewModal}/>

        {/* outlet */}
    <div className='sm:h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <Outlet/>
      </div>
       
    </div>
    {
        reviewModal && <CourseReviewModal SetReviewModal={SetReviewModal}/>
    }
    </div>
  )
}

export default ViewCourse