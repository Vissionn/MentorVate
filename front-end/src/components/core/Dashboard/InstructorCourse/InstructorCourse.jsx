import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Button from "../../HomePage/Button";
import { DeleteCourseHandler, getInstructorCoursesHandler } from "../../../../Services/operation/CourseDetailsApi";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../Services/FormateDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import { HiClock } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi"
import { logout } from "../../../../Services/operation/AuthApi";


const InstructorCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [InstructorCourse, SetInstructorCourse] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30;

  
  const getInstructorCourses = async () => {
    try {
      const response = await getInstructorCoursesHandler(token);

      SetInstructorCourse(response);
    } catch (error) {
      console.log("Unable to Fetch Instructor Courses", error.message);
    }
  };
  
  useEffect(() => {
   
    getInstructorCourses();
  }, []);
  

  const DeleteCourse = async (CourseId) => {
    console.log("CurseId",CourseId);
    setLoading(true)
    try {
       await DeleteCourseHandler({ courseId: CourseId },token)
       setConfirmationModal(null)
       // function call dubara esliye kra h jiss s UI update ho ske
       getInstructorCourses();
    } catch (error) {
      console.log("Unable to Delete Instructor Course", error.message);
    }
    setLoading(false)
  }

  // if(token){
  //   dispatch(logout(Navigate))
  // }

  return (
    <div className="text-white">
    
    { 
      InstructorCourse.length > 0 ? 
        <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Course</Th>
            <Th className=" text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
            <Th className=" text-left text-sm font-medium uppercase text-richblack-100">Price</Th>
            <Th className=" text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>
          </Tr>
        </Thead>
           
        <Tbody>
       
          
          {InstructorCourse.map((course, index) => {
            return (
              <Tr key={index} className=" flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                <Td className="flex flex-1 gap-x-4">
                  <div className="flex gap-x-4">
                    <img src={course?.thumbnail}  className="h-[148px] w-[220px] rounded-lg object-cover" />
                    <div className="flex flex-col justify-between">
                      <h1>{course?.courseName}</h1>

                      <p className="text-xs text-richblack-300">{course?.courseDescription.split(" ").length > TRUNCATE_LENGTH  ? 
                      course?.courseDescription.split(" ").slice(0,TRUNCATE_LENGTH).join(" ") + "..." 
                      : course?.courseDescription}</p>

                      <span className="text-base text-white">Created : {formatDate(course?.createdAt)}</span>

                      {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                    </div>
                  </div>
                </Td>

                <Td className="text-sm font-medium text-richblack-100">
                  <p>2hr 30 min</p>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  <p>₹{course?.price}</p>
                </Td>

                <Td className="text-sm font-medium text-richblack-100">
                <button
                    disabled={loading}
                    onClick={() => {
                        Navigate(`/dashboard/edit-course/${course?._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                     disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:"All the data related to this course will be deleted",
                        btn1text: "Delete" ,
                        btn2text: "Cancel",
                        bntHandler1: !loading
                        //esme handlecoursedelete ka function
                          ? () => {DeleteCourse(course?._id)}
                          : () => {},
                        bntHandler2: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        {confirmationModal && <ConfirmationModal data={confirmationModal} />}
      </Table>
     
     : (
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
  );
};

export default InstructorCourse;
