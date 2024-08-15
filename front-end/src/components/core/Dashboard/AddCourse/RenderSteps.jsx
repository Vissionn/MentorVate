import React from 'react'
import { FaCheck } from 'react-icons/fa'
import {  useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse';



const RenderSteps = () => {

    const {step} = useSelector((state) => state.course)
    

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        }
    ]
  return (
    <>
      <div className=" relative flex mb-2 justify-center w-[340px] lg:w-full ">
        {steps.map((item, index) => (
        <>
          <div className=" flex flex-col items-center" key={index}>
            <button
              className={`  rounded-full w-[34px] aspect-square text-2xl text-center ${
                item.id === step
                  ? "bg-yellow-900 border border-yellow-50 text-yellow-50 "
                  : " border-richblack-700 bg-richblack-800 text-richblack-300 "
              } ${step > item.id && " bg-yellow-100"}`}
            >
              {step > item.id ? (
                <FaCheck className=" text-black ml-1 " />
              ) : (
                item.id
              )}
            </button>
            </div>
          

            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]   border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
        </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>

      {step === 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <PublishCourse/>}
    </>
  
  );
}

export default RenderSteps