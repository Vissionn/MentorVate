import { apiConnector } from "../apiConnector";
import { ratingsEndpoints } from "../apis";

const {REVIEWS_DETAILS_API} = ratingsEndpoints

export const GetAllReviewsHandler = async() => {
    let result = null;
    try {
        const res = await apiConnector("GET",REVIEWS_DETAILS_API)
        console.log("REVIEWS_DETAILS_API_RESPONSE",res);
        if (!res.data.success) {
            throw new Error(res.data.message)
          }

        result = res.data
        
    } catch (error) {
        console.log("REVIEWS_DETAILS_API_ERROR............", error)
        result = error.response.data
    }
    return result
}