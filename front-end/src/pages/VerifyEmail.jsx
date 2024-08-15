import React, { useState,useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../Services/operation/AuthApi";

const VerifyEmail = () => {
  const { signupData , loading } = useSelector((state) => state.auth);
  const [otp, Setotp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleOnSubmit = (e) => {
    e.preventDefault();
    // take data from signupData slice for passing to the signup function
  const {FirstName,LastName,email,password,confirmPassword,accountType} = signupData;
    // console.log("signupData:" , signupData);
    // console.log("otp", otp);
    dispatch(signUp(accountType,FirstName, LastName, email,password,confirmPassword,otp,navigate))
  }

  return (
    <div>
      {loading ? (
        <div>Loding...</div>
      ) : (
        <div className="text-white">
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={HandleOnSubmit}>
            <OtpInput
              value={otp}
              onChange={Setotp}
              numInputs={6}
              renderInput={(props) => <input {...props} placeholder="-" className=" bg-richblack-400 text-white" />}
            />
            <button type="submit">Verify Email</button>
          </form>

          <div>
            <div>
              <Link to={"/login"}>Back to Login</Link>
            </div>

            <button>Resend it</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
