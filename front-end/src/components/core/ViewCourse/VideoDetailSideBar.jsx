import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconButton from '../../Common/IconButton'
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

const VideoDetailSideBar = ({SetReviewModal}) => {
    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures} = useSelector((state) => state.viewCourse)
    // console.log("total",totalNoOfLectures);
    
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [videoActive, SetVideoActive] = useState("")
    const [sectionActive , SetSectionActive] = useState("")
    const {sectionId,subSectionId} = useParams()

    useEffect(() => {
        ;(() => {

            if(!courseSectionData.length) {
                return
            }
            const CurrentSectionIndex = courseSectionData.findIndex((data) => 
                data._id === sectionId
            )

            const CurrentSubSectionIndex = courseSectionData?.[CurrentSectionIndex]?.SubSection.findIndex((data) => {
               return  data._id === subSectionId
            })

            const activeSubSectionId = courseSectionData?.[CurrentSectionIndex]?.SubSection?.[CurrentSubSectionIndex]?._id

            // setcurrent section
            SetSectionActive(courseSectionData?.[CurrentSectionIndex]?._id)
            // setcurrent SubSection
            SetVideoActive(activeSubSectionId)
        }) ()
    },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div className="flex flex-col sm:min-w-[280px] border-r-[2px] border-r-richblack-700 sm:h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">

      {/* for buttons and heading */}
      <div className=' py-4 px-1' >

        {/* for buttons */}
        <div className='flex justify-around gap-x-5 items-center mb-2'>
          <div
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
            className=' cursor-pointer'
          >
            <IoChevronBackCircleSharp className=' text-4xl text-yellow-700'/>
          </div>

          <div className=''>
            <IconButton
              btntxt="Add Review"
              btnHandler={() => SetReviewModal(true)}
            />
          </div>
        </div>

      {/* for Heading */}
        <div className=' flex  items-center gap-x-3 mt-5 px-3'>
            <p className=' text-xl font-semibold font-inter text-richblack-5 uppercase'>{courseEntireData?.courseName}</p>
            <p className=' text-base text-caribbeangreen-600 font-semibold'>{completedLectures.length} / {totalNoOfLectures}</p>
        </div>


      </div>
      
      <div>
      {
        courseSectionData.map((section , index) => {
            return (
                // ess div k click s url m koi change nhi hoga, direct hi sectionActive ki value change ho jayge, jiss s useeffect call nhi hoga, or video stop nhi hogi, jb hum koi video dekhte hue, kese or section pr click kr denge...to video chalti rhege....agr useeffect call hota to url change ho rha hota...jiss s sectionId bhi change hoti url m.....too new url k according new section open hota...jiski wajah s video stop ho jati...
                <div key={index} onClick={() => {SetSectionActive(section?._id)}} className=' py-2 shadow-sm '>

                {/* section */}
                <div className=' flex justify-between items-center px-4 bg-richblack-300 py-4 border-b border-white cursor-pointer hover:bg-richblack-200'>
                    <div className=' uppercase'>
                        {section?.sectionName}
                    </div>
                    <div className={`${sectionActive === section?._id ? " rotate-180" : " rotate-0"}`}>
                        <IoIosArrowUp/>
                    </div>
                </div>

                {/* subSection */}
                <div>
                {
                    sectionActive === section?._id && (
                        <div>
                            {
                                section?.SubSection?.map((subsection , index) => {
                                    return (
                                        <div key={index} className={` flex gap-x-2 px-4 cursor-pointer py-2 ${videoActive === subsection?._id ? " bg-yellow-600 text-richblack-900" : " bg-richblack-600 text-white transition-all duration-75 hover:bg-yellow-200"}`}
                                        onClick={() => {
                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`) 
                                            SetVideoActive(subsection?._id)
                                        }}
                                        >
                                           <input 
                                            type='checkbox'
                                            checked={completedLectures.includes(subsection?._id)}
                                           />
                                           <span>
                                           {subsection?.title}
                                           </span>
                                           
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                </div>


                </div>
            )
        })
      }
      </div>


    </div>
  );
}

export default VideoDetailSideBar