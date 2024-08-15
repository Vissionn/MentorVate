import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice";
import { logout } from "./AuthApi";

const {UPDATE_DISPLAY_PICTURE_API
       ,UPDATE_PROFILE_API,
        CHANGE_PASSWORD_API,
        DELETE_PROFILE_API
      }  = settingsEndpoints;



export const ChangeImageHandler = (formData, token) => {


    // console.log("tokennn" , token);
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response  = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,
                {       
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  }
            )
            console.log("UPDATE_DISPLAY_PICTURE_API_RESPONSE", response);
            if (!response) {
                throw new Error(response.message)
              }
             dispatch(setUser(response.data.data))
             localStorage.setItem("user", JSON.stringify(response.data.data))
            toast.success("Image Changes Successfully")
           
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR", error);
            toast.error("Unable to Update Image")
        }
        toast.dismiss(toastId)
    }
}

export const ChangeProfileDetails = (data,token,Navigate) => {
    return async(dispatch) => {
       const toastId=  toast.loading('loading...')
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data ,{
                "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
            },   
        )
        console.log("UPDATE_PROFILE_API_RESPONSE", response) 
        toast.success("Profile Details Changed")
        dispatch(setUser(response.data.data))
        localStorage.setItem("user", JSON.stringify(response.data.data))
        Navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("UPDATE_PROFILE_API ERROR", error);
            toast.error("Unable to Update Profile Details")
        }
        toast.dismiss(toastId)
    }
}

export const changePassword = (data,token,Navigate) => {
    return async(dispatch) => {
        const toastId=  toast.loading('loading...')
        try {
            const response = await apiConnector("PUT", CHANGE_PASSWORD_API, data, {
                "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
            })
            console.log("CHANGE_PASSWORD_API_RESPONSE", response) 
            toast.success("Password Changed")
            // dispatch(setUser(response.data.data))
            // localStorage.setItem("user", JSON.stringify(response.data.data))
            dispatch(logout(Navigate))
        } catch (error) {
            console.log("CHANGE_PASSWORD_API ERROR", error);
            toast.error("Unable to Change Password")
        }
        toast.dismiss(toastId)
    }
}

export const DeleteAccountHandler = (id,Navigate,token) => {
    return async(dispatch) => {
        const toastId=  toast.loading('loading...')
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, id, {
                  "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
            } )
            console.log("DELETE_PROFILE_API", response) 
            toast.success("Account Deleted Successfully")
            dispatch(logout(Navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API_ERROR", error);
            toast.error("Unable to Delete Account !")
        }
        toast.dismiss(toastId)
    }
}