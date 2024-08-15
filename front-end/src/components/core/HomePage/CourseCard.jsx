import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";


const CourseCard = ({CourseCardData , currentCard, SetCurrentCard }) => {
  return (
    <div>
    <div className={`flex flex-col max-w-[341.33px] lg:max-h-[300px] gap-4  ${currentCard === CourseCardData?.heading ? " bg-white shadow-[12px_12px_0_0] shadow-yellow-50": "bg-richblack-800"} cursor-pointer`} onClick={() => SetCurrentCard(CourseCardData?.heading)}>
    <div className=' px-6 pt-[32px] pb-[52px] flex gap-3 flex-col'>
    <h1 className={`font-semibold text-base ${currentCard === CourseCardData?.heading ? " text-black": "text-richblack-25"}`}>{CourseCardData?.heading}</h1>
    <p className='font-normal text-base text-richblack-500'>{CourseCardData?.description}</p>
    </div>

    <div className=' border-t border-dashed border-richblack-600 flex flex-row gap-14 justify-between items-center px-4 py-6'>
       <div className={`flex flex-row items-center gap-2 font-medium ${currentCard === CourseCardData?.heading ? " text-richblue-500": "text-richblack-300"}`}>
        <HiUsers/>
        Beginner
       </div>

       <div className={`flex flex-row items-center gap-2 font-medium ${currentCard === CourseCardData?.heading ? " text-richblue-500": "text-richblack-300"}`}>
        <ImTree/>
        6 Lessions
       </div>

    </div>
    </div>
 
    </div>
  )
}

export default CourseCard