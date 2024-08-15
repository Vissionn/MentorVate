import React from 'react'
import SignupImg from "../assets/Images/signup.webp"
import Template from '../components/core/Auth/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
    title="Join the Millions learning to code with StudyNotion For Free"
    desc1="Build skills for today tommorow, and beyond."
    desc2="Education to future-proof your carrer."
    image={SignupImg}
    formtype="signup"
    setIsLoggedIn={setIsLoggedIn}
  />
  )
}

export default Signup