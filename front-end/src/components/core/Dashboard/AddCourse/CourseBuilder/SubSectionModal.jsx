import React, { useEffect, useState } from 'react'
import Upload from '../../Upload'
import { get, useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux'
import { SetCourse, SetStep } from '../../../../../slices/courseSlice'
import IconButton from '../../../../Common/IconButton'
import { MdKeyboardArrowRight } from "react-icons/md";
import { CreateSubSectionHandler, UpdateSubSectionHandler } from '../../../../../Services/operation/CourseDetailsApi'
import toast from 'react-hot-toast'

const SubSectionModal = ({
    modalData,
    setModalData,
    view=false,
    add=false,
    edit=false,
}) => {
    const{Course,editCourse} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const {handleSubmit, register,setValue,getValues,formState:{errors}} = useForm()
    const [loading , setLoading] = useState(false)

    useEffect(() => {
      if(view || edit) {
        setValue("video", modalData?.videoUrl)
        setValue("title" , modalData?.title)
        setValue("lectureDescription" , modalData?.description)
      }
    },[])
    

    // const currentValue = getValues()
    // console.log("Currentvalue" , currentValue);

    const isFormUpdated = () => {
        const currentValue = getValues()
        
        if(currentValue.title !== modalData.title || 
          currentValue.lectureDescription !== modalData.description ||
        currentValue.video !== modalData.videoUrl ) {
          return true
        }
        else return false
    }

    const editHandler = async() => {
      const currentValue = getValues()
      const formdata = new FormData()
      console.log("Currentvalue" , currentValue);
      formdata.append("CourseId" , modalData?.CourseId)
      formdata.append("SubSectionId", modalData?.SubSectionId)

      if(currentValue.title !== modalData.title) {
        console.log("Title changed", currentValue.title);
        formdata.append("title", currentValue?.title)
      }
      if(currentValue.lectureDescription !== modalData.description) {
        console.log("description changed");
        formdata.append("description", currentValue?.lectureDescription)
      }
      if(currentValue.video !== modalData.videoUrl) {
        console.log("video changed");
        formdata.append("videoFile", currentValue?.video)
      }

      console.log("add subsection form",Array.from(formdata.entries()));

      const result = await UpdateSubSectionHandler(formdata , token)
      if(result) {
        setModalData(null)
        dispatch(SetCourse(result))
      }
    }


    // sumbit handle function
    const onSubmitHandle = async(data)=> {
      console.log("data",data);
      console.log("edite",edit);
      setLoading(true)
      if(view) return

      if(edit) {
        if(isFormUpdated()) {
          editHandler()
        }
        else {
          toast.error("Make Some Change")
        }
        return

      }
      

     // Create/add ---> Lecture/Subsection
     if(add) {
      const form = new FormData()
      form.append("CourseId" , modalData?.CourseId)
      form.append("SectionId", modalData?.SectionId)
      form.append("title", data?.title)
      form.append("description", data?.lectureDescription)
      form.append("videoFile", data?.video)

      // console.log("add subsection form",Array.from(form.entries()));

      // api handler call for add/create lecture
      const result = await CreateSubSectionHandler(form,token)

      if(result) {
        setModalData(null)
        dispatch(SetCourse(result))
        
      }
     }
     setLoading(false)
    }

    // console.log("Result after add SubSection",Course);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex flex-col items-center justify-center overflow-auto bg-opacity-10 backdrop-blur-sm bg-white">
      

      <form onSubmit={handleSubmit(onSubmitHandle)}>
      {/* Modal Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5 lg:w-[650px]">
        <p className="text-xl font-semibold text-richblack-5">
          {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
        </p>
        <button onClick={() => (!loading ? setModalData(null) : {})}>
          <RxCross2 className="text-2xl text-richblack-5" />
        </button>
      </div>
        <div className="flex flex-col lg:w-[650px]  justify-between gap-y-7 rounded-md rounded-t-none border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12">
          <Upload
            type="file"
            name="video"
            label="Video Lecture:"
            id="video"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture title */}
          <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="title" className="lable-style">
              <p>Lecture Title:</p>
            </label>
            <input 
              type="text"
              disabled={view}
              placeholder="Enter Course Title"
              id="title"
              name="title"
              className="form-style"
              
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Lecture Title is required
              </span>
            )}
          </div>

          {/* Lecture desc */}
          <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="lectureDescription" className="lable-style">
              <p>Lecture Description:</p>
            </label>
            <textarea
              rows={4}
              type="text"
              disabled={view}
              placeholder="Enter Description"
              id="lectureDescription"
              name="lectureDescription"
              className="form-style"
              {...register("lectureDescription", { required: true })}
            />
            {errors.lectureDescription && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Lecture Description is required
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end items-end mt-7 ">
          {!view && (
            <div className='flex gap-x-2'>
              {edit && (
                <button
                  className="flex items-cente bg-pure-greys-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 "
                  onClick={() => {
                    // dispatch(SetEditCourse(true))
                    // dispatch(SetStep(3));
                    setModalData(null)
                  }}
                >
                  Continue Without Saving
                </button>
              )}

              <IconButton
                btntxt={edit ? "Save Changes" : "Save"}
                //  btnHandler={handleSubmit}
                children={<MdKeyboardArrowRight />}
                type="submit"
                disbaled={loading}
              />
            </div>
          ) }
        </div>
      </form>
    </div>
  );
}

export default SubSectionModal