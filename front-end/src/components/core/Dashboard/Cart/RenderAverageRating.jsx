import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import {GiNinjaStar} from "react-icons/gi"
import GetAvgRating from '../../../../utils/avgRating'

const RenderAverageRating = ({ratingAndReview}) => {
    const [AverageReviewCount , setAvgReviewCount] = useState("")
    const {cart} = useSelector((state) => state.cart)

     useEffect(() => {
        (() => {
          try {
            const result =  GetAvgRating(ratingAndReview)
            if(result) {
              setAvgReviewCount(result)
            }
          } catch (error) {
            console.log("Could not fetch the averageRating",error.messgae);
          }
        }) ()
      },[cart])

  return (
    <div className='flex items-center gap-2'>
       <span className="text-yellow-5">{AverageReviewCount || 0}</span>
       <ReactStars
         count={5}
         size={20}
         value={AverageReviewCount}
         edit={false}
         activeColor="#ffd700"
        emtpyIcon={<GiNinjaStar />}
        fullIcon={<GiNinjaStar />}
       />
    </div>
  )
}

export default RenderAverageRating