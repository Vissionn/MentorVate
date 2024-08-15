import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { RiMenuFold4Fill } from "react-icons/ri";
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { DeleteSectionHandler, DeleteSubSectionHandler } from '../../../../../Services/operation/CourseDetailsApi';
import { SetCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { RxDropdownMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa"
import SubSectionModal from './SubSectionModal';

const CourseBuilderSection = ({editClickHandler}) => {

    const {Course,editCourse} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    // const section = Course?.courseContent
    const courseId = Course?._id
    const dispatch = useDispatch()
    const [ConfirmModal , SetConfirmModal] = useState(null)
    const [ViewSubSection , SetViewSubSection] = useState(null)
    const [editSubSection , SeteditSubSection] = useState(null)
    const [addSubSection , SetaddSubSection] = useState(null)
    // console.log("sections",section);

   const RemoveSctionHandler = async(SubSection,Id) => {
    // console.log("SubsectionId",SubSection);
    const SubSectionId = SubSection.map((SubsectionId) => SubsectionId?._id)
    const id = JSON.stringify(SubSectionId)
    console.log("ResultId",SubSectionId)
    // e.preventDefault();
    const result = await DeleteSectionHandler( {SubSectionId:id, sectionId: Id, courseId: courseId },token );
    if (result) {
      dispatch(SetCourse(result));
    }
    SetConfirmModal(null);
    toast.success("Section Deleted Successfully");
    
  };
  // console.log("After Deleted section",Course);


  const RemoveSubSectionHandler = async(SubSectionID,sectionID,CourseId) => {
    // e.preventDefault();
    
       const result = await DeleteSubSectionHandler({ CourseId: CourseId,subSectionId:SubSectionID ,sectionId: sectionID }, token );
       console.log("result",result);  
       if (result) {
         dispatch(SetCourse(result))
         }
         SetConfirmModal(null);
  }

  // console.log("Updated Course",Course);


  // const editSubSectionHandler = async(id,title,timeDuration,description,videoUrl) => {
  //   try {
  //     const result = await UpdateSubSectionHandler({SubSectionId:id , title:title,timeDuration:timeDuration,description:description,videoUrl:videoUrl},token)
  //   } catch (error) {
  //     console.log("Unable to Dispatch Function for SubSection updation ", error.message);
  //   }
  // }

  // useEffect(() => {
  //   SetCourse(Course)
  // },[Course])

  // console.log("Modal",ConfirmModal);
  
   
  return (
    <div className="mt-10">
      <div className="rounded-lg bg-richblack-600 py-5 px-4">
        {Course?.courseContent.map((item, index) => {
          {/* console.log("items",item) */}
          return (
            <>
              <details key={index} className=" flex justify-between gap-x-36" open>
                <summary className=" flex justify-between">
                  <div className=" font-inter font-semibold text-base text-richblack-50 flex items-center gap-2 cursor-pointer">
                    <RxDropdownMenu />
                    {item?.sectionName}
                  </div>

                  <div className="flex gap-x-2 ">
                    <button
                      onClick={() =>
                        editClickHandler(item?.sectionName, item?._id)
                      }
                    >
                      <MdOutlineEdit className=" text-richblack-200" />
                    </button>
                    <button
                      onClick={() =>
                        SetConfirmModal({
                          text1: "Are You Sure ?",
                          text2: "Section Will be Deleted Permanently !",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          bntHandler1:  () => RemoveSctionHandler(item?.SubSection,item?._id),
                          bntHandler2: () => {
                            SetConfirmModal(null);
                          },
                        })
                      }
                    >
                      <RiDeleteBin5Line className=" text-richblack-200" />
                    </button>
                    <span className=" text-richblack-200">|</span>
                    <button>
                      <TiArrowSortedDown className=" text-richblack-200" />
                    </button>
                  </div>
                </summary>

                {/* SubSection Part */}
                <div>
                  {
                    item?.SubSection?.map((subSectionDetails) => {
                      {/* console.log("Subsection",subSectionDetails) */}
                      return (
                        <>
                          <div
                            key={subSectionDetails?._id}
                            
                            className=" flex justify-between items-center gap-x-3 border-b border-richblack-200"
                          >
                            <div className=" font-inter font-semibold text-base text-richblack-50 flex items-center gap-2 cursor-pointer" onClick={() => SetViewSubSection(subSectionDetails)}>
                              <RxDropdownMenu />
                              {subSectionDetails?.title}
                            </div>

                            <div className="flex gap-x-2 ">
                              <button
                                onClick={() =>
                                  SeteditSubSection({
                                    ...subSectionDetails,
                                    SubSectionId: subSectionDetails?._id,
                                    sectionId: item?._id,
                                    CourseId: courseId,
                                  })
                                }
                              >
                                <MdOutlineEdit className=" text-richblack-200" />
                              </button>

                              <button
                                onClick={() =>
                                  SetConfirmModal({
                                    text1: "Are You Sure ?",
                                    text2:
                                      "This Lecture Will be Deleted Permanently !",
                                    btn1text: "Delete",
                                    btn2text: "Cancel",
                                    bntHandler1: () =>
                                      RemoveSubSectionHandler(subSectionDetails?._id ,item?._id,courseId),
                                    bntHandler2: () => {
                                      SetConfirmModal(null);
                                    },
                                  })
                                }
                              >
                                <RiDeleteBin5Line className=" text-richblack-200" />
                              </button>
                              
                              
                            </div>
                          </div>
                        </>
                      );
                    })}

                    {/* Add new lecture to SubSection */}
                    <button className="mt-3 flex items-center gap-x-1 text-yellow-50 mb-2"
                    onClick={() => SetaddSubSection({CourseId:courseId,SectionId:item?._id})}>
                      <FaPlus className="text-lg" />
                      <p>Add Lecture</p>
                    </button>
                </div>
              </details>
              <div className=" border border-richblack-700 mb-4"></div>
            </>
          );
          
        })}
      </div>
      {ViewSubSection && 
      <SubSectionModal 
      modalData={ViewSubSection}
      setModalData={SetViewSubSection}
        view={true}
      />}
      {editSubSection && 
      <SubSectionModal
          modalData={editSubSection}
          setModalData={SeteditSubSection}
          edit={true}
      />}
      {
        addSubSection && 
        <SubSectionModal
          modalData={addSubSection}
          setModalData={SetaddSubSection}
          add={true}
        />
      }
      {ConfirmModal && <ConfirmationModal data={ConfirmModal}/>}
    </div>
  );
}

export default CourseBuilderSection