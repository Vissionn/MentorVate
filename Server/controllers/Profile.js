const User = require("../models/user");
const Profile = require("../models/Profile");
const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { populate } = require("../models/Category");
const { convertSecondsToDuration } = require("../utils/SecToDuration");
// const cloudinary = require("cloudinary").v2;

// const user = require("../models/user");


// ........Update Profile..........

exports.UpdateProfile = async(req,res) => {
    try {
        //  fetch the data from req body
        const { firstName = "",
        lastName = "", gender="" , dateOfBirth="", about="", contactNumber="" } = req.body;

        const userid = req.User.id;
        // validation
        // if(!gender || !contactNumber || !userid) {
        //     return res.json({
        //         success:false,
        //         message:"Please fill all the Profile fields Carefully , All fields are Required",
        //     })
        // }

        // find Profile
        const userDetails = await User.findById(userid);

        const profileId = userDetails.additionalDetails;
        console.log("hello" , profileId);

        // const user = await User.findByIdAndUpdate(userid, {
        //     firstName,
        //     lastName,
        //   })
        //   await user.save()

        const profileDetails = await Profile.findById(profileId);
        console.log("profile" , profileDetails);
          // update the profile created at the time of signup controller


        //    const updatedProfile= await Profile.findByIdAndUpdate(profileId,
        //     {
        //         $push: {
        //             gender:gender,
        //             dateOfBirth:dateOfBirth,
        //                about:about,
        //             contactNumber:contactNumber,
        //         }   
        //    })

       // update profile field
       profileDetails.dateOfBirth = dateOfBirth;
       profileDetails.about = about;
       profileDetails.gender = gender;
       profileDetails.contactNumber = contactNumber;

       // save the updated profile
       await profileDetails.save();

       console.log("Profile details" , profileDetails);

       // Find the updated user details
         const updatedUserDetails = await User.findById(userid)
         .populate("additionalDetails")
        .exec() 

        // add the proile globalId to user schema
        // const updatedUserDetails = await User.findByIdAndUpdate(userid , {
        //     $push:{
        //         additionalDetails:updatedProfile._id,
        //     }
        // },{new:true})


        // return res
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            data: updatedUserDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server error, while updating profile",
            error:error.message,
        })
    }
}


// ..........DeleteAccount............

exports.deleteAccount = async(req,res) => {
    try {
        // get id
        const id = req.User.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:"User not Found",
            })
        }
        // delete additional profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // TODO:  hw unenroll user from all enrolled courses

        // delete user
        await User.findByIdAndDelete({_id:id})

        //return res
        return res.status(200).json({
            success:true,
            message:"User Delete Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some went wrong while deleting the account",
            error:error.message,
        })
    }
}

// .......UserDetails.......
exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.User.id
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
      console.log(userDetails)
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

// .......Updatedisplaypicture.........
  exports.updateDisplayPicture = async(req,res) => {
    try {
      const profilePic = req.files.displayPicture;
      console.log("profile" , profilePic);
      const id = req.User.id;
      console.log("id" , id);

      const responseProfilePicUrl = await uploadImageToCloudinary(profilePic , "KeshavMegaProject" , 1000 , 1000);

      console.log("pic",responseProfilePicUrl);
    const UpdatedProfilePic =  await User.findByIdAndUpdate(
      {_id:id} 
       , {
        image : responseProfilePicUrl.secure_url,
      } , 
      {new:true})

      return res.status(200).json({
        success:true,
        message:"Profile Picture Updated Successfully",
        data: UpdatedProfilePic,
      })
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: `This is error: ${error.message}` 
      })
    }
  }

// ........UserEnrolledCourses(student)........
  exports.getEnrolledCourses = async(req,res) => {
    try {
      const id = req.User.id;
      console.log("id", id);
      let userDetails = await User.findById(id)
      .populate({
        path:"courses",
        populate:{
          path:"ratingAndReviews",
        }
      })
      .populate({
        path:"courses",
        populate:{
          path:"courseContent",
          populate:{
            path:"SubSection"
          }
        }
      })
      .exec()
       
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${id}`,
        })
      }

      // it is too important to convert the userdetails object, into plain object so the changes made easily....without this you cannot change/add the new field(totalDuration) into object
       userDetails = userDetails.toObject()
      

      for (var course of userDetails.courses) {
        let duration = 0;
        var SubsectionLength = 0;

        const Sections = course.courseContent;
        for (const section of Sections) {
          const subsections = section.SubSection;
          SubsectionLength += subsections.length;
          for (const subsection of subsections) {
            duration += parseInt(subsection.timeDuration);
          }
        }
        
        // console.log("subsectionlength",SubsectionLength);
        // show the duration
        var totalduration = convertSecondsToDuration(duration);
        course.totalDuration = totalduration;
      

        // show the progress bar percentage
        let courseProgressCount = await CourseProgress.findOne({
          courseID: course?._id,
          userId: id,
        });
        courseProgressCount = courseProgressCount?.completedVideos?.length;
        
        if (SubsectionLength === 0) {
          course.progressPercentage = 100;
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2);
          // console.log("count", courseProgressCount);
          //  console.log("multiplier",multiplier);
          // console.log('Progrees', Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier);
          
          course.progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier;
        }
        // console.log("course", course);
      }
     
      return res.status(200).json({
        success:true,
        data: userDetails.courses,
        message: "User Courses Fetched Successfully"
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  // .........Instructor Dashboard Details............
  exports.instructorDashboard = async(req,res) => {
    try {
      const InstructorId = req.User.id
      const CoursesDetails = await Course.find({instructor:InstructorId})

     const CourseData =  CoursesDetails.map((course) => {
        const totalStudentEnrolled = course.studentEnrolled.length
        const totalAmount = totalStudentEnrolled * course.price

        // make new object containing all stats
        const InstructorStats = {
          CourseId: course._id,
          CourseName: course.courseName,
          courseDesc: course.courseDescription,
          totalStudentEnrolled,
          totalAmount
        }

        return InstructorStats
      })

      return res.status(200).json({
        success:true,
        message:"Instructor Dashboard Details Fetched Successfully",
        data:CourseData
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "failed to Fetch the Instructor Dashboard Details",
        error:error.message,
      })
    }
  }



