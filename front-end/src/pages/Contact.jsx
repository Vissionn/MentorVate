import React from 'react'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import { TiMessages } from "react-icons/ti";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import ContactForm from '../components/core/ContactPage/ContactForm';
import Footer from '../components/Common/Footer';
import ReviewSlider from '../components/core/HomePage/ReviewSlider';

const Contact = () => {

    const Data = [
        {
            icon:<TiMessages/>,
            label:"Chat on us",
            description:"Our friendly team is here to help.",
            info:"@mailaddress"
        },
        {
            icon:<FaEarthAmericas/>,
            label:"Visit us",
            description:"Come and say hello at our office HQ.",
            info:"Here is the location/ address"
        },
        {
            icon:<FaPhoneAlt/>,
            label:"Call us",
            description:"Mon - Fri From 8am to 5pm",
            info:"+123 456 7890"
        }
    ]
  return (
    <div>
 <div className='flex flex-col gap-y-6 lg:flex-row gap-x-14  lg:justify-center  px-[10px] lg:px-[120px] py-[90px]  '>
        <div className='flex flex-col justify-around bg-richblack-800 max-h-[390px] lg:w-[25%] rounded-lg p-6  gap-6 lg:order-first order-last '>
        {
            Data.map((data,index) => {
                return (
                    <div className='p-3 max-h-[98px]'>
                    <div className='flex gap-x-3 text-white' key={index}>
                    <div  className='max-w-[21px]'>{data?.icon}</div>
                    <div className='flex flex-col '>
                    <h1 className='text-lg font-semibold font-inter'>{data?.label}</h1>
                    <p className=' text-sm font-medium font-inter text-richblack-200'>{data?.description}</p>
                    <p className=' text-sm font-medium font-inter text-richblack-200'>{data?.info}</p>
                    </div>
                    </div>
                    </div>
                  
                )
            })
        }
        </div>

        <div className='lg:w-[40%] flex flex-col gap-y-8 border border-richblack-600 p-14 rounded-lg'>
        <div className='flex flex-col gap-y-3 '>
            <h1 className=' text-4xl font-semibold font-inter text-white'>Got a Idea? We’ve got the skills. Let’s team up</h1>
            <p className=' text-base font-medium font-inter text-richblack-200'>Tall us more about yourself and what you’re got in mind.</p>
        </div>
            <ContactForm/>
        </div>

        
    </div>
    {/* review section */}
    <section className=' mx-auto my-10 w-11/12 max-w-maxContent bg-richblack-900 flex-col items-center justify-between gap-8'>
        <h1 className="text-center text-4xl font-semibold mt-8 text-white">Reviews from other learners</h1>
        <ReviewSlider/>
    </section>
    <section>
            <Footer/>
        </section>
    </div>
   
  )
}

export default Contact