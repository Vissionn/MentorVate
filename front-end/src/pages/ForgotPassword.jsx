import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordToken } from '../Services/operation/AuthApi';

const ForgotPassword = () => {

    const [email , SetEmail] = useState("");
    const [emailSent, SentEmailSent] = useState(false);
    // const [loading] = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPasswordToken(email,SentEmailSent))
    }
    

  return (
    <div className=' bg-richblack-700 text-black'>
        <h1>
            {
                !emailSent ? "Reset your password" : "Check Email"
            }
        </h1>
        <p>
            {
                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
            }
        </p>

        <form onSubmit={submitHandler}>
            {
                !emailSent && 
                <label>
                    <p>Email Address:</p>
                    <input 
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}    
                    />
                </label>
            }
            <button type='submit'>
                {
                    !emailSent ? "Reset Password" : "Resend Email"
                }
            </button>
        </form>
        <div>
        <Link to={"/login"}>
            Back to Login
        </Link>
        </div>
        
    </div>
  )
}

export default ForgotPassword