import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard'

const tabeName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]




const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabeName[0]);
    const [courses , SetCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , SetCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setmyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value)
        SetCourses(result[0].courses);
        SetCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div className='flex flex-col gap-12 mx-auto items-center'>
            <div className='flex flex-col gap-2 items-center lg:w-11/12'>
                <div className=' font-semibold text-4xl text-center lg:w-[1200px] w-[358px] '>Unlock the <HighlightText text={"Power of Code"}/></div>
                <p className=' font-medium text-base text-richblack-300'>Learn to Build Anything You Can Imagine</p>
            </div>

            <div className='flex flex-col rounded-md lg:flex-row gap-5 text-richblack-200 items-center bg-richblack-800 -mt-5 mx-auto w-max p-1 lg:rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)'>
                {
                    tabeName.map((tab, index) => {
                    return (
                        <div className={`text-base px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 ${currentTab === tab? "bg-richblack-900 text-richblack-5 font-medium": " text-richblack-100" }`} key={index} onClick={() => setmyCard(tab)}>
                        {tab}
                        </div>
                    )
                })
                }
            </div>

             <div className='lg:h-[150px]'></div> 

            {/* Course Card */}
            <div className='flex flex-col lg:flex-row lg:gap-16 gap-10 w-11/12 items-center lg:absolute lg:-bottom-[7%] '>
                {
                    courses.map((element , index) => {
                        return (
                            <CourseCard key={index} CourseCardData={element} currentCard={currentCard} SetCurrentCard={SetCurrentCard}/>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore