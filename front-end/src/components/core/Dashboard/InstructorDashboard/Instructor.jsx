import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorCoursesHandler } from '../../../../Services/operation/CourseDetailsApi'
import { GetInstructorDashBoardDetialsHandler } from '../../../../Services/operation/ProfileApi'
import { setLoading } from '../../../../slices/authSlice'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'

const Instructor = () => {

    const [InstructorData , SetInstructorData] = useState(null)
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const [loading , SetLoading] = useState(false)
    const [courses , SetCourses] = useState([])
    
    

    useEffect(() => {
        const getInstructorDashBoardDetials = async() => {
            SetLoading(true)
            try {
                const res = await GetInstructorDashBoardDetialsHandler(token)
                const result = await getInstructorCoursesHandler(token)

                if(res) {  
                    SetInstructorData(res)
                }

                if(result) {
                    SetCourses(result)
                }
            } catch (error) {
                console.log("Unable to Fetch the Instructor Dashboard Page Details", error.message);
                
            }
            SetLoading(false)
        }

       getInstructorDashBoardDetials()
    },[])

    console.log("Instrutor data",InstructorData);
    
    const totalAmount = InstructorData?.data?.reduce(
        (acc, curr) => acc + curr.totalAmount,
        0
      )
    
      const totalStudents = InstructorData?.data?.reduce(
        (acc, curr) => acc + curr.totalStudentEnrolled
        ,
        0
      )

    //   console.log("total", courses);
      
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div className='flex flex-col gap-y-1'>
          <div className="my-4 flex lg:flex-row flex-col gap-y-3 lg:h-[450px] space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
                
              <InstructorChart courses={InstructorData?.data} />
              
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-richblack-800 p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {courses.slice(0, 3).map((course,index) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Instructor