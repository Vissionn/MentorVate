import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/Images/login.webp"

const Login = ({setIsLoggedIn , isLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today tommorow, and beyond."
      desc2="Education to future-proof your carrer."
      image={loginImg}
      formtype="Login"
      setIsLoggedIn={setIsLoggedIn}
      isLoggedIn={isLoggedIn}
    />
  )
}

export default Login