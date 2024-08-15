import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";
import {courseEndpoints} from "../apis"
import { catalogData } from "../apis";

const {COURSE_CATEGORIES_API} = courseEndpoints;
const {CATALOGPAGEDATA_API} = catalogData;



export const getAllCategoryHandler = async() => {
let Category = [];
try {
  const response = await apiConnector("GET", COURSE_CATEGORIES_API, null);
  console.log("CATEGORIES_API_RESPONSE", response);
  Category = response?.data?.data;
} catch (error) {
  console.log("CATEGORIES_API_ERROR", error);
  // toast.error("Unable to Fetch Categories !")
}
return Category;
}


export const CatalogPageDataHandler = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("POST",CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    console.log("CATALOGPAGEDATA_API_RESPONSE",response);
    
    result = response?.data
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}