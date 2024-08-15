import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourse } from '../../../Services/operation/ProfileApi'
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

     const {token} = useSelector((state) => state.auth)
     const {user} = useSelector((state) => state.profile)
     const TRUNCATE_LENGTH = 30;
     const navigate = useNavigate()
    //  console.log("user", user);
     const {_id} = user;
    //  console.log("id", _id);
    //  console.log("TOken", token);
     const [EnrolledCourses, SetEnrolledCourse] = useState(null)
    //  const dispatch = useDispatch()

     const getEnrolledCourses = async() => {
        try {
            // dispatch s bhi kr skte h call or ess tarah s bhi kr skte h
            const response = await getUserEnrolledCourse(token,_id)
            console.log("response",response);
            
            SetEnrolledCourse(response);
            console.log("enrolled course", EnrolledCourses);
        } catch (error) {
            console.log("Unable to Fetch User Enrolled Courses", error.message);
        }
     }

     useEffect(() => {
        getEnrolledCourses()
     },[])

  return (
    <div className='text-white'>
        <h1 className="text-3xl text-richblack-50">Enrolled Courses</h1>
        <div className='text-white mt-11'>
            {!EnrolledCourses ? (<div>
                Loading....
            </div>) : 
              !EnrolledCourses.length ? (<p className='text-white'>You Have not enrolled in any Courses</p>) : 
              (
                <Table className="rounded-xl border border-richblack-800 ">
                    <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 bg-richblack-600">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Course name</Th>
                        <Th className="md:flex-1  text-left text-sm font-medium uppercase text-richblack-100">duration</Th>
                        <Th className=" lg:mr-20 text-left text-sm font-medium uppercase text-richblack-100">Progress</Th>
                    </Tr>
                     
                    </Thead>

                    {/* course card */}
                    <Tbody>
                    {
                        EnrolledCourses.map((course,index) => {
                            return (
                              <Tr
                                key={index}
                                className=" flex gap-x-10 border-b border-richblack-800 px-6 py-8 "
                                onClick={() => {
                                  console.log("sectioId",course?.courseContent[0]?._id)
                                  console.log("SubsectioId",course?.courseContent[0]?.SubSection[0]?._id)
                                  navigate(`/view-course/${course._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.SubSection[0]?._id}`)}}
                              > 
                                <Td className="flex flex-1 gap-x-4">
                                  <img
                                    src={course.thumbnail}
                                    className="h-[108px] w-[160px] rounded-lg object-cover transition-all duration-200 hover:scale-95 cursor-pointer"
                                    
                                  />
                                  <div>
                                    <p>{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                      {course?.courseDescription.split(" ")
                                        .length > TRUNCATE_LENGTH
                                        ? course?.courseDescription
                                            .split(" ")
                                            .slice(0, TRUNCATE_LENGTH)
                                            .join(" ") + "..."
                                        : course?.courseDescription}
                                    </p>
                                  </div>
                                </Td>

                                <Td className="md:flex-1 ml-8  md:w-1/4 px-2 py-3">{course?.totalDuration}</Td>

                                <Td className="flex md:w-1/5 flex-col gap-2 px-2 py-3">
                                  <p>
                                    Progress: {course.progressPercentage || 0}%
                                  </p>
                                  <ProgressBar
                                    completed={course.progressPercentage}
                                    height="8px"
                                    isLabelVisible={false}
                                  />
                                </Td>
                              </Tr>
                            );
                        })
                    }
                    </Tbody>
                    
                </Table>
              )
              }
        </div>
    </div>
  )
}

export default EnrolledCourses