const Section = require("../models/Section");
const Course = require("../models/Course");
const User = require("../models/user");
const SubSection = require("../models/SubSection")
const {ObjectId } = require("mongodb")

var mongoose = require('mongoose')

exports.createSection = async(req,res) => {
    try {
        // fetch the data
        const {sectionName, courseId} = req.body;
        // console.log("section and course id", sectionName, courseId);
        const userId = req.User.id;
        // data validation
        if(!sectionName || !courseId) {
            return res.json({
                success:false,
                messsage:"Section name and CourseId required, please enter it",
            })
        }

        // check user exist or not
        const userDetails = await User.findById(userId);
        
        if(!userDetails) {
           return res.status(500).json({
               success:false,
               messsage:"User(instructor) Not exist, Its account may be Deleted or logout ",
           })
        }

        // create section in db
        const createdSection = await Section.create({sectionName:sectionName});

        // update course schema with section objecctID
        // hw -> use populate to replacw sections /sub-sections both in the updatedCourseDetails
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push:{
                courseContent:createdSection._id,
            }
        },
         {new:true},
        )
        .populate({
            path:"courseContent",
            populate:{
                path: "SubSection",
            },
        }
        )
        // console.log("courseDetail",updateCourseDetails);
        // return response
        return res.status(200).json({
            success:true,
            messsage:"Section created Successfully",
            data : updateCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:"Unble to create section,Please try again",
            error:error.messsage,
        })
    }
}


exports.updateSection = async(req,res) => {
    try {
         // fetch the data
         const {sectionName, courseId ,createdSectionId , updatedSectionName} = req.body;
         const userId = req.User.id;
         console.log("id" , createdSectionId);
         console.log("userId",userId);
         // data validation
         if(!sectionName || !createdSectionId) {
             return res.json({
                 success:false,
                 messsage:"Section must be created first for updation, Please create the section first",
             })
         }

         // check user exist or not
         const userDetails = await User.findById(userId);
         console.log("User", userDetails);
         if(!userDetails) {
            return res.status(500).json({
                success:false,
                messsage:"User(instructor) Not exist, It may be deleted or logout ",
            })
         }

         // update section
         const updatedSection = await Section.findByIdAndUpdate(createdSectionId , { sectionName}, {new:true})

         // here no need to update the course because the section is already created , here only updation of section perform
         const course = await Course.findById({_id: courseId})
         .populate({
            path:"courseContent",
            populate:{
                path: "SubSection",
            },
         })
         // return response
         return res.status(200).json({
            success:true,
            messsage:"Section updated Successfully",
            data : course
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:"Unble to Update section,Please try again",
            error:error.messsage,
        }) 
    }
}


exports.deleteSection = async(req,res) => {
    try {
        // get Id - assuming that we are sending ID in params
        const{SubSectionId,sectionId,courseId} = req.body;
        const userId = req.User.id;
        // console.log("SubsectionId",SubSectionId);
        // const id = SubSectionId.map((id) => id)
        // console.log("Id",id);

        // for (let index = 0; index < SubSectionId.length; index++) {
        //     const objectId = ObjectId(SubSectionId[index])
        //     console.log("ObjectId",objectId);
            
        // }

        // const ObjectIdArray = SubSectionId.map((id) => ObjectId(id))
        // console.log("ObjectId",ObjectIdArray);
        
        // check user exist or not
        const userDetails = await User.findById(userId);
        console.log("User", userDetails);
        if(!userDetails) {
           return res.status(500).json({
               success:false,
               messsage:"User(instructor) Not exist, It may be deleted or logout ",
           })
        }

        const section = await Section.findById(sectionId)
        if(!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
              })
        }
 

        // use findByIdandDelete
       const DeletedSection = await Section.findByIdAndDelete(sectionId).populate("SubSection");
         const DeleteSubSections = await SubSection.deleteMany({_id: {$in: section.SubSection}})

         //      remove sectionId from coursecontent after deleting the section
     const updateCourseDetails =  await Course.findByIdAndUpdate(courseId , {
        $pull:{
            courseContent:sectionId,
        }
       }).populate({
        path:"courseContent",
        populate:{
            path: "SubSection",
        },
     });

       // TODO :do we need to delete the objectID of created section from course schema after deleting the section.
        // return response
        return res.status(200).json({
            success:true,
            messsage:"Section Deleted Successfully",
            data : updateCourseDetails,  
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:"Unble to delete section,Please try again",
            error:error.messsage,
        }) 
    }
}