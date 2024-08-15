import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {courseEndpoints} from "../apis"

const  {COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,} = courseEndpoints;


    export const fetchCourseDetails = async (courseId) => {
      const toastId = toast.loading("Loading...")
      //   dispatch(setLoading(true));
      let result = null
      try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
          courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE............", response)
    
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        result = response.data
      } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
      }
      toast.dismiss(toastId)
      //   dispatch(setLoading(false));
      return result
    }


   export const getInstructorCoursesHandler = async(token) => {
        let result = []
            try {
                const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null , {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                } )
                console.log("GET_ALL_INSTRUCTOR_COURSES_API", response) 
                result = response?.data?.data
            } catch (error) {
                console.log("GET_ALL_INSTRUCTOR_COURSES_API_ERROR", error);
                toast.error("Unable to Fetch Instructor Courses !")
            }
            return result;
        }

       // addcourse detail
        export const addCourseDetail = async(formData,token) => {
            let result = null;
            const toastId = toast.loading("Loading...")
            try {
                const response = await apiConnector("POST", CREATE_COURSE_API , formData , {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                })
                console.log("CREATE_COURSE_API_RESPONSE", response) 
                result = response?.data?.data
            } catch (error) {
                console.log("CREATE_COURSE_API_ERROR", error);
                toast.error("Unable to Fetch Instructor Courses !")
            }
            toast.dismiss(toastId);
            return result;
        }

        // edit the course details
       export const editCourseDetails = async (data, token) => {
         let result = null;
         const toastId = toast.loading("Loading...");
         try {
           const response = await apiConnector("POST", EDIT_COURSE_API, data, {
             "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
           });
           console.log("EDIT COURSE API RESPONSE............", response);
           if (!response?.data?.success) {
             throw new Error("Could Not Update Course Details");
           }
           toast.success("Course Details Updated Successfully");
           result = response?.data?.data;
         } catch (error) {
           console.log("EDIT COURSE API ERROR............", error);
           toast.error(error.message);
         }
         toast.dismiss(toastId);
         return result;
       };


        export const CreateSectionHandler = async(sectionName,courseId,token) => {
            let result = null;
            const toastId = toast.loading("Loading...")
            try {
                const response = await apiConnector("POST", CREATE_SECTION_API , {sectionName,courseId} , {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                })
                console.log("CREATE_SECTION_API_RESPONSE", response) 
                result = response?.data?.data
            } catch (error) {
                console.log("CREATE_SECTION_API_ERROR", error);
                toast.error("Unable to Create Section of the Course !")
            }
            toast.dismiss(toastId);
            return result;
        }

        export const EditSectionHandler = async(data,token) => {
            let result = null;
            const toastId = toast.loading("Loading...")
            try {
                const response = await apiConnector("POST", UPDATE_SECTION_API , data , {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                })
                console.log("UPDATE_SECTION_API_RESPONSE", response) 
                result = response?.data?.data
            } catch (error) {
                console.log("UPDATE_SECTION_API_ERROR", error);
                toast.error("Unable to Update Section of the Course !")
            }
            toast.dismiss(toastId);
            return result;
        }


        export const DeleteSectionHandler = async(data,token) => {
            let result = null;
            const toastId = toast.loading("Loading...")
            try {
                const response = await apiConnector("POST", DELETE_SECTION_API , data , {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                })
                console.log("DELETE_SECTION_API_RESPONSE", response) 
                result = response?.data?.data
                
            } catch (error) {
                console.log("DELETE_SECTION_API_ERROR", error);
                toast.error("Unable to Delete Section of the Course !")
            }
            toast.dismiss(toastId);
            return result;
            
        }
    
        export const CreateSubSectionHandler = async(data,token) => {
          let result = null
          console.log("add subsection form",data);
          const toastId = toast.loading("Loading...")
          try {
            const response = await apiConnector("POST",CREATE_SUBSECTION_API, data , {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              })
              console.log("CREATE_SUBSECTION_API_RESPONSE", response) 
              result = response?.data?.data;
              if (!response?.data?.success) {
                throw new Error("Could Not Create Lecture");
              }
          } catch (error) {
            console.log("CREATE_SUBSECTION_API_ERROR", error);
            toast.error("Unable to Create Lecture of the Course !")
          }
          toast.dismiss(toastId)
          return result
        }


        export const UpdateSubSectionHandler = async(data,token) => {
            let result = null;
            const toastId = toast.loading("Loading...")
            try {
                const response = await apiConnector("POST", UPDATE_SUBSECTION_API , data,  {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                })
                console.log("UPDATE_SUBSECTION_API_RESPONSE", response) 
                result = response?.data?.data
                toast.success("Lecture Updated Successfully")
            } catch (error) {
                console.log("UPDATE_SUBSECTION_API_ERROR", error);
                toast.error("Unable to Update Lecture of the Course !")
            }
            toast.dismiss(toastId);
            return result;
        }


        // delete a subsection
        export const DeleteSubSectionHandler = async (data, token) => {
          let result = null;
          const toastId = toast.loading("Loading...");
          try {
            const response = await apiConnector(
              "POST",
              DELETE_SUBSECTION_API,
              data,
              {
                Authorization: `Bearer ${token}`,
              }
            );
            console.log(
              "DELETE SUB-SECTION API RESPONSE............",
              response
            );
            if (!response?.data?.success) {
              throw new Error("Could Not Delete Lecture");
            }
            toast.success("Lecture Deleted");
            result = response?.data?.data;
          } catch (error) {
            console.log("DELETE SUB-SECTION API ERROR............", error);
            toast.error(error.message);
          }
          toast.dismiss(toastId);
          return result;
        };

        export const DeleteCourseHandler = async(data,token) => {
           console.log("data", data);
          const toastId = toast.loading("Loading...");
            try {
              const response = await apiConnector("DELETE", DELETE_COURSE_API , data , {
                  // "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
              })
              console.log(
                "DELETE_COURSE_API_RESPONSE............",
                response
              );
              if (!response?.data?.success) {
                throw new Error("Could Not Delete Lecture");
              }
              toast.success("Course Deleted");
              // result = response?.data?.data;
            } catch (error) {
              console.log("DELETE_COURSE_API_ERROR............", error);
              toast.error("Unable to Delete Course");
            }
            toast.dismiss(toastId);
          
          
        }

        export const CourseDetailHandler = async(courseId,token) => {
          // console.log("data", courseId);
          let result = null;
        //  const toastId = toast.loading("Loading...");
           try {
             const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED , {courseId},{
              Authorization: `Bearer ${token}`,
            })
             console.log(
               "COURSE_DETAILS_API_RESPONSE............",
               response
             );
             if (!response?.data?.success) {
               throw new Error("Could Not Fetch Course Details");
             }
              result = response?.data?.data;
              // toast.success("Edit Course Details Fetched");
           } catch (error) {
             console.log("COURSE_DETAILS_API_ERROR............", error);
             toast.error("Unable to Fetch the Course for edit");
           }
          //  toast.dismiss(toastId);
           return result;
         
       }


       // create a rating for course
        export const createRating = async (data, token) => {
          const toastId = toast.loading("Loading...");
          let success = false;
          try {
            const response = await apiConnector(
              "POST",
              CREATE_RATING_API,
              data,
              {
                Authorization: `Bearer ${token}`,
              }
            );
            console.log("CREATE RATING API RESPONSE............", response);
            if (!response?.data?.success) {
              throw new Error("Could Not Create Rating");
            }
            toast.success("Rating Created");
            success = true;
          } catch (error) {
            success = false;
            console.log("CREATE RATING API ERROR............", error);
            toast.error(error.message);
          }
          toast.dismiss(toastId);
          return success;
        };

        // mark a lecture as complete
       export const markLectureAsComplete = async (data, token) => {
         let result = null;
         console.log("mark complete data", data);
         const toastId = toast.loading("Loading...");
         try {
           const response = await apiConnector(
             "POST",
             LECTURE_COMPLETION_API,
             data,
             {
               Authorization: `Bearer ${token}`,
             }
           );
           console.log(
             "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
             response
           );

           if (!response.data.message) {
             throw new Error(response.data.error);
           }
           toast.success("Lecture Completed");
           result = true;
         } catch (error) {
           console.log(
             "MARK_LECTURE_AS_COMPLETE_API API ERROR............",
             error
           );
           toast.error(error.message);
           result = false;
         }
         toast.dismiss(toastId);
         return result;
       };

       