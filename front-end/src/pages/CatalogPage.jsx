import React, { useEffect, useState } from 'react'
import { CatalogPageDataHandler, getAllCategoryHandler } from '../Services/operation/Category'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Error from './Error'
import Footer from "../components/Common/Footer"
import CourseSlider from '../components/core/Catalog/CourseSlider'
import CourseCard from '../components/core/Catalog/CourseCard'

const CatalogPage = () => {

    const {CatalogName} = useParams()
     const [CategoryId,SetCategoryId] = useState("")
     const [active, setActive] = useState(1)
     const [loading, setLoading] = useState(false)
     const [catalogPageData, setCatalogPageData] = useState(null)

    useEffect(() => {
        
         (async() => {
            
            try {
                const result = await getAllCategoryHandler()
                 console.log("result",result);
                
            if(result) {
                const Category = result.filter((category) => category?.name.split(" ").join("-").toLowerCase() === CatalogName)
                console.log("category",Category[0]?._id);
                SetCategoryId(Category[0]?._id)
                // console.log("id",CategoryId);
            }
            } catch (error) {
                console.log("error while Fetching the Category",error.message);
            }
           
        })()
  
    },[CatalogName])

    useEffect(() => {
       if(CategoryId) {
        (async() => {
          
            try {
                const result = await CatalogPageDataHandler(CategoryId)
                console.log("result",result);
                
                setCatalogPageData(result)
            } catch (error) {
                console.log("error while Fetching the page details",error.message);
                
            }
           
        }) ()
       }
    },[CategoryId])

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

      if(!loading && !catalogPageData.success) {
        return (
            <div>
                <Error/>
            </div>
        )
      }
    

   
    
  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading ">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading ">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer/>
    </>
  )
}

export default CatalogPage