const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course")
const { uploadImageToCloudinary } = require("../utils/imageUploader");


 exports.CreateSubSection = async(req,res) => {
    try {
        // fetch the data from req body
        const{CourseId , SectionId, title, description } = req.body;
        // extract  files/video
        const video = req.files.videoFile;
        // validation
        if(!SectionId || ! title  || !description ||  !video) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME , 1000, 1000);
        // create sub section
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //  add sub section objectId to section schema
        const UpdatedSection = await Section.findByIdAndUpdate(SectionId ,{
            $push:{
                SubSection:SubSectionDetails._id,
            }
        },{new:true}).populate("SubSection");

        const updateCourseDetails = await Course.findById(CourseId).populate({
            path:"courseContent",
            populate:{
                path: "SubSection",
            },
         })
    
        // HW: log updated section here, after adding populate query
        // return res 
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully and return Updated Course",
            data : updateCourseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server error, while creating sub section",
            error:error.message,
        })
    }
 }

 // Hw updateSubSection

 exports.UpdatedSubSection = async(req,res) => {
    try {
        // fetch the data
        const {CourseId , SubSectionId , title,description} = req.body;

        
        //  console.log(CourseId,SubSectionId,title,description);
        //  console.log("vide0",video);
         const Subsection = await SubSection.findById(SubSectionId)

         if(title !== undefined) {
            Subsection.title = title
         }

         if(description !== undefined) {
            Subsection.description = description
         }

         if(req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
               //upload video to cloudinary
               const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME , 1000, 1000);
               Subsection.videoUrl = uploadDetails.secure_url  
               Subsection.timeDuration = `${uploadDetails.duration}`
         }
         
           
         

         await Subsection.save()

        // // validation
        // if(!SubSectionId || ! title  || !description ||  !video) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"All fields are required",
        //     });
        // }

        

        //update sub section in db
        // const UpdatedSubSection = await SubSection.findByIdAndUpdate(SubSectionId , 
        //     {title:title,
        //     timeDuration:`${uploadDetails.duration}`,
        //     description:description,
        //     videoUrl:uploadDetails.secure_url,},
        //     {new:true},
        // )

        //Find updated Section
        //  const updatedSection = await Section.findById(SectionId)
        const updateCourseDetails = await Course.findById(CourseId).populate({
            path:"courseContent",
            populate:{
                path: "SubSection",
            },
         })
        // return response
        return res.status(200).json({
            success:true,
            messsage:"SubSection updated Successfully",
            data : updateCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong, while updating sub section",
            error:error.message,
        })
    }
 }


 // hW deleteSubSection

 exports.deleteSubSection = async(req,res) => {
    try {
        // get Id - assuming that we are sending ID in params
        //const{SubSectionId} = req.params;

           // TODO :do we need to delete the objectID of created Subsection from Section schema after deleting the Subsection.
        const { CourseId, subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                SubSection: subSectionId,
              },
            }
          )

        // use findByIdandDelete
       const DeletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

       // return course
       const updateCourseDetails = await Course.findById(CourseId).populate({
        path:"courseContent",
        populate:{
            path: "SubSection",
        },
     })
    

        // return response
        return res.status(200).json({
            success:true,
            messsage:"SubSection Deleted Successfully",
            data : updateCourseDetails  
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:"Unble to delete Subsection,Please try again",
            error:error.messsage,
        }) 
    }
 }