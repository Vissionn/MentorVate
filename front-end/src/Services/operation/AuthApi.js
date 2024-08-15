import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"
import {setLoading, setToken} from "../../slices/authSlice"
import { useDispatch } from "react-redux"
import { setUser } from "../../slices/profileSlice"

const {SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API}  =  endpoints

    

// export const sendOtp = (email,navigate) => {

//    return async(dispatch) => {
//     const toastId = toast.loading("Loading...")
//     try {
//         const response = await apiConnector("POST",SENDOTP_API , {
//             email,
//         checkUserPresent: true,
//         })
//         toast.success("Send OTP Successfully");
//          console.log(response)
//         // navigate("/verify")
//     } catch (error) {
//         console.log(error.message);
//         console.log("SENDOTP API ERROR............", error)
//         toast.error("Could Not Send OTP")
//     }
//     toast.dismiss(toastId)
//    }

   
// }

export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))

      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        // console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    Password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
    
      // dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          Password,
          confirmPassword,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        // navigate("/signup")
      }
      // dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export const login = (email,Password,navigate,dispatch) => {
    const toastId = toast.loading("Loading...")
    return async(dispatch) => {
      try {
        const response = await apiConnector("POST" , LOGIN_API, {
          email,
          Password,
        })
        console.log("response:", response);
        toast.success("Login")
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.User))
         localStorage.setItem("token", JSON.stringify(response.data.token))
          localStorage.setItem("user", JSON.stringify(response.data.User))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      toast.dismiss(toastId);
    }
   
  }


  export const resetPasswordToken = (email,SentEmailSent) => {
    
      return async() => {
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector("POST" , RESETPASSTOKEN_API , {
            email,
            checkUserPresent:true,
          })
          toast.success("Resent Link Sent Successfully");
           SentEmailSent(true)
        } catch (error) {
          console.log("RESETPASSTOKEN API  ERROR............", error)
          toast.error("Could Not Send Link")
        }
        toast.dismiss(toastId)
      }
    
  }


  export const resetPassword = (password,confirmPassword,token,navigate) => {
    return async() =>{
      try {
        const response = await apiConnector("POST" , RESETPASSWORD_API , {
          password,
          confirmPassword,
          token,
        })
        
        toast.success("Password Reset Successfully");
        navigate("/login")
         
      } catch (error) {
        console.log("RESETPASSWORD API  ERROR............", error)
        toast.error("Could Not Reset Password")
      }
    }
  }


  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      // dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }

  