const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// ...CreateRating....

exports.createRating = async(req,res) => {
    try {
        // get user id
        const userId = req.User.id;

        // fetch data from req body
        const {rating, review, courseId} = req.body;

        // check if user is enrolled or not
        const courseDetail = await Course.findOne({_id:courseId});
        const userEnrolled = courseDetail.studentEnrolled.includes(userId);
        if(!userEnrolled) {
            return res.json({
                success:false,
                message:"Please enrolled first in this course to rate and review the course",
            })
        }

        //check  if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });

        if(alreadyReviewed) {
            return res.json({
                success:false,
                message:"course is already reviewed by the user",
            })
        }
        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating , review,
            course:courseId,
            user:userId,
        })

        // update course with this rating/review
       const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
            $push:{
                ratingAndReviews:ratingReview._id
            }
        },
        {new:true})
        console.log(updatedCourseDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review Created Successfully",
            ratingReview
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// ....getAverageRating....

exports.getAverageRating = async(req,res) => {
    try {
        // get courseId
        const {courseId} = req.body;

        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            { 
                $match:{ course: new mongoose.Types.ObjectId.createFromHexString(courseId)}
            },
            { 
            $group:{ _id:null,  averageRating:{ $avg: "$rating"} }
            },
        ])

        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        // if no rating / review exist
        
            return res.status(200).json({
                success:true,
                message:"Average Rating is 0, no rating given till now",
                averageRating:0
            })
        
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllRatingandReviews of all courses

exports.getAllRatingReviews = async(req,res) => {
    try {
        const getAllRatingAndReviews = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName",
        })
        .exec();

        // console.log(getAllRatingAndReviews);

        return res.status(200).json({
            success:true,
            message:"All reviews fetched Successfully",
            data:getAllRatingAndReviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch all Rating and Reviews",
        })
    }
}