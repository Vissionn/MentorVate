import React from 'react'
import ContactForm from '../ContactPage/ContactForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 lg:px-[420px] lg:pt-[90px] pb-0 max-w-maxContent'>
    <div className=' flex flex-col items-center gap-y-2 mb-6 '>
    <h1 className=' text-4xl font-semibold font-inter'>Get In Touch</h1>
    <p className=' text-richblack-300 text-base font-medium font-inter'>We’d love to here for you, Please fill out this form.</p>
    </div>
        
        <ContactForm/>
    </div>
  )
}

export default ContactFormSection