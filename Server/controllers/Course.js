const { json } = require("express");
const Category = require("../models/Category");
const Course = require("../models/Course");
const user = require("../models/user");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/SecToDuration");


exports.createCourse = async(req,res) => {
    try {
        // data fetch
        let {courseName,courseDescription,whatYouWillLearn,price,category,status, tag,instructions} = req.body;

        // console.log("Thumbnail",req.files);
        //  console.log("Thumbnail",req.files);
        //file fetch
        const thumbnail = req.files.thumbnailUpload
        console.log("thumbnail",thumbnail);

        const instruction = JSON.parse(instructions)
        // console.log("instructionss",instructions);
        const Tag = JSON.parse(tag)
        

        // const Tag = JSON.parse(tag)
        
        // validatiion
       
        if(!courseName ||!courseDescription||!whatYouWillLearn || !price ||!thumbnail  || !category|| !Tag.length || !instruction.length ){
            return res.json({
                success:false,
                message:"All Fields are Required",
                
            })
        }

        if (!status || status === undefined) {
            status = "Draft"
          }

        // instructor data fetch by using Id via payload
        const userId = req.User.id;
        const instructorDetails = await user.findById(userId, {
            accountType: "Instructor",
        });
        console.log("Instructor Details", instructorDetails);
        //TODO: verify that userId and instructorDetais._id are same or different 

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor Detail not Found",
            });
        }

        // check given Category is valid or not
        const CategoryDetails = await Category.findById(category); 
        console.log("category" , CategoryDetails);
        if(!CategoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category details not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImg = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({courseName:courseName,
            // courseContent:courseContent,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            price:price,
            whatYouWillLearn:whatYouWillLearn,
            thumbnail:thumbnailImg.secure_url,
            category:CategoryDetails._id,
            status:status,
            tag:Tag,
            instructions:instruction,
            // tag:tagDetails._id,
        })

        // find by id
        // const course = await Course.findById(newCourse._id).populate("category")

        // update instructor schema by adding the newcourse
        await user.findByIdAndUpdate({_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        // update Category schema by adding the newcourse
        await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully by the instructor",
            data:newCourse,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Create the Course",
            error: error.message,
        })
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId} = req.body
      const {category,previousCategory} = req.body
      //  console.log("category",previousCategory);
      
      const updates = req.body
      const course = await Course.findById(courseId)
      // const Ctg =  await Category.findById(category)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailUpload
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
         // Check if the property belongs to the object itself and not its prototype
        if (updates.hasOwnProperty(key)) {
            // If the key is "tag" or "instructions", parse the value as JSON
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            // Otherwise, directly assign the value
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "SubSection",
          },
        })
        .exec()

         // update Category schema by adding the course into new category
         if(category) {
          await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                    courses:updatedCourse._id,
                }
            },
            {new:true},
        )
         }
         

      // update the category schema by removing the course from previous category
      if(previousCategory) {
        await Category.findByIdAndUpdate({_id:previousCategory},
          {
              $pull:{
                  courses:updatedCourse._id,
              }
          },
          {new:true},
      )
      }
     

      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  //Delete Course
exports.deleteCourse = async(req,res) => {
    try {
        const {courseId} = req.body
        console.log("courseId",courseId);
        const InstructorId = req.User.id
        console.log("InstructorID",InstructorId);

        const course = await Course.findById(courseId)
        if(!course) {

            return res.status(404).json(
                {
                    success:false,
                    message:"Course is Not Found",
                },
            )
        }

        const Instructor = await user.findByIdAndUpdate(InstructorId, {
            $pull:{
                courses:courseId
            }
        })

        // delete All sub-section and Section of that Particular Course
        const CourseSectionsIds = course.courseContent
        for(const EachSectionId of CourseSectionsIds) {
            const Eachsection = await Section.findById(EachSectionId)
            // delete sub-sections of the section
            if(Eachsection) {
                const SubSectionIds = Eachsection.SubSection
                for(const EachSubsectionId of SubSectionIds){
                    const SubSectiondelete = await SubSection.findByIdAndDelete(EachSubsectionId)
                }
            }
            // delete section 
            const Sectiondelete = await Section.findByIdAndDelete(EachSectionId)
        }

     
        const courses = await Course.findByIdAndDelete(courseId)
        

        // return res
        return res.status(200).json({
            success:true,
            messsage:"Course Deleted Successfully",
        })
    } catch (error) {
        console.error(error)
      res.status(500).json({
        success: false,
        message: "Unable to Delete Course",
        error: error.message,
      })
    }
}

// get allcourser handler function

exports.getAllCourses = async(req,res) => {
    try {
        // TODO change 
        const allCourse = await Course.find({});

        console.log("all Courses are" ,allCourse);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetch all courses",
            error: error.message,
        })    
    }
}

// ...get course details....

exports.getCourseDetails = async(req,res) => {
    try {
         // get courseId
         const {courseId} = req.body;
        //  console.log("id",courseId);
         

         // find all the detail
         const courseDetail = await Course.findById({_id:courseId})
         .populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails"
                }
            }
         )
         .populate("category")
         .populate("ratingAndReviews")
         .populate({
            path:"courseContent",
            populate:{
                path:"SubSection",
            }
         })
         .exec();

        //  console.log("coursedetail",courseDetail);
         

         // validation
         if(!courseDetail) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            })
         }

         let totalDurationInSeconds = 0
         courseDetail.courseContent.forEach((content) => {
           content.SubSection.forEach((subSection) => {
             const timeDurationInSeconds = parseInt(subSection.timeDuration)
             totalDurationInSeconds += timeDurationInSeconds
           })
         })
     
         const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

         // return response
         return res.status(200).json({
            success:true,
            message:"Successfully get the entire Course Details",
            data:{
              courseDetail,
              totalDuration
            },
         })
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// ....get full course details with time durartion and completed videos this function is for student-coursewatch....
exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.User.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "SubSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.SubSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

// get Instructor Courses

exports.getInstructorCourses = async(req,res) => {
    try {
        const InstructorID = req.User.id;
        const InstructorCourse = await Course.find({
            instructor:InstructorID
        }).sort({createdAt:-1})

        if(!InstructorCourse){
            return res.status(400).json({
                success:false,
                message:`There will be No course Created by the Instructor: ${InstructorID}`
            })
        }

        return res.status(200).json({
            success:true,
            message:"Instructor Courses Fetched Successfully",
            data:InstructorCourse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}