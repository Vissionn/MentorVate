import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {profileEndpoints} from "../apis"
import { setUser } from "../../slices/profileSlice";


const { GET_INSTRUCTOR_DATA_API
      ,GET_USER_DETAILS_API
      ,GET_USER_ENROLLED_COURSES_API} = profileEndpoints;


      export const getUserEnrolledCourse = async(token,id) =>  {
        // console.log("id",id);
            // const toastId=  toast.loading('loading...')
            let result = [];
            try {
                const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, id , {
                    
                    Authorization: `Bearer ${token}`,
                })
                console.log("GET_USER_ENROLLED_COURSES_API_RESPONSE", response) 
                // dispatch(setUser(response.data.data))
                result = response?.data?.data
            } catch (error) {
                console.log("GET_USER_ENROLLED_COURSES_API_ERROR", error);
                toast.error("Unable to Fetch User Enrolled Courses !")
            }
            // toast.dismiss(toastId)
            return result;
        }
    

        export const GetInstructorDashBoardDetialsHandler = async(token) => {
            // console.log("token",token);
            let result = null;
            const toastId=  toast.loading('loading...')
            try {
                const res = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
                    Authorization:`Bearer ${token}`,
                })
                console.log("GET_INSTRUCTOR_DATA_API_RESPONSE", res) 
                result = res?.data
            } catch (error) {
                console.log("GET_INSTRUCTOR_DATA_API_ERROR", error);
                toast.error("Unable to Fetch Instructor Dashboard Details !")
            }
            toast.dismiss(toastId)
            return result
        }