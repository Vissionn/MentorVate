import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully committed to the success company",
    },
    {
        logo:logo2,
        heading:"Leadership",
        description:"Fully committed to the success company",
    },
    {
        logo:logo3,
        heading:"Leadership",
        description:"Fully committed to the success company",
    },
    {
        logo:logo4,
        heading:"Leadership",
        description:"Fully committed to the success company",
    },
]

const TimelineSection = ({backgroundGradient}) => {
  return (
    <div>
        <div className='flex lg:flex-row flex-col gap-20 items-center'>
          
          <div className='flex flex-col gap-8 '>
             
             {
                timeline.map((element , index) => {
                    return(
                        <div className=' relative flex flex-row gap-3 pt-4 pr-3 pb-4 pl-3' key={index}>

                             <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                <img src={element.logo}/>
                             </div>

                               <div className='flex flex-col'>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className=' text-base'>{element.description}</p>
                                     
                                </div>

                                {
                                     timeline.length - 1 === index ?  <div></div> :<div className=' absolute border border-richblack-100 bg-richblack-400/0 border-dashed border-r h-[42px]  top-20 left-9'></div>

                       
                                }
                               

                        </div>
                    )
                })
                    
              }
           

          </div>

          <div className='timelineImage relative z-10'>
            <img src={timelineImage} height={545} width={714} className='img pt-5 pl-3' />
            {backgroundGradient}

            <div className=' absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>

              <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                <p className='text-3xl font-bold'>10</p>
                <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
              </div>

              <div className='flex flex-row gap-5 items-center   px-7'>
                <p className='text-3xl font-bold'>250</p>
                <p className=' text-caribbeangreen-300 text-sm'>Type of Courses</p>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default TimelineSection