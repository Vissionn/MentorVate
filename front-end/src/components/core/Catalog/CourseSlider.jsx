import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { Autoplay,Pagination,FreeMode } from 'swiper/modules'; 

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import CourseCard from "./CourseCard"

function CourseSlider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
         modules={[Autoplay,FreeMode, Pagination]}
         FreeMode={true}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
