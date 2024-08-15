import React from 'react'
import HighlightText from "./HighlightText";
import img1 from "../../../assets/Images/Compare_with_others.png"
import img2 from "../../../assets/Images/Know_your_progress.png"
import img3 from "../../../assets/Images/Plan_your_lessons.png"
import Button from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center  pt-[90px]  pb-[90px]  md:gap-8 sm:gap-8 lg:gap-8  '>
      <div className='flex flex-col gap-4 items-center justify-center'>
      
        <div className='font-inter text-4xl font-semibold lg:w-[760px] md:w-[358px] sm:w-[358px] text-center '>
          Your Swiss Knife for <HighlightText text={"learning any language"}/>
        </div>
        
        <div>
          <p className=" font-inter text-base font-medium text-richblack-700 text-center lg:w-[75%] mx-auto ">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:gap-0 items-center justify-center mt-8 '>
        <img src={img2} width={341} height={340} className=' lg:-mr-14  lg:scale-110'/>
        <img src={img1} width={341} height={408} className=' lg:-mb-10 lg:-mt-0 -mt-12  lg:scale-125 '/>
        <img src={img3} width={341} height={346} className='  lg:-ml-14 lg:-mt-5 -mt-16  lg:scale-125'/>
      </div>

      <div className='pt-9 max-w-[137px]'>
        <Button active={true} linkto={"/login"}>
          Learn more
        </Button>
      </div>
    </div>
  )
}

export default LearningLanguageSection