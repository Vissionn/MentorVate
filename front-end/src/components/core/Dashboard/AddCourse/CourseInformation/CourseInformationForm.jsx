import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../../Common/IconButton';
import { MdKeyboardArrowRight } from "react-icons/md";
import { getAllCategoryHandler } from '../../../../../Services/operation/Category';
import { SetCourse, SetEditCourse, SetStep } from '../../../../../slices/courseSlice';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import { addCourseDetail, editCourseDetails } from '../../../../../Services/operation/CourseDetailsApi';
import toast from 'react-hot-toast';
import TagField from './TagField';
import { MdCloudUpload } from "react-icons/md";
import Upload from '../../Upload';
import { COURSE_STATUS } from '../../../../../utils/constants';

const CourseInformationForm = () => {

    const {register,
        handleSubmit,
        getValues,
        setValue,
        formState:{errors}} = useForm();

        const {Course,editCourse} = useSelector((state) => state.course)
        const {token} = useSelector((state) => state.auth)
        const dispatch = useDispatch();
        const [Category, SetCategory] = useState([])
        const [loading , setLoading] = useState(false)
        // const Category = ["Web-dev","App-Dev","Python"]

      

        

        useEffect(() => {
          const getCategory = async() => {
            try {
                const response = await getAllCategoryHandler()
                //  console.log("Category",response);
                if(response.length > 0) {
                  SetCategory(response)
                }
            } catch (error) {
                console.log("Unable to Fetch Category", error.message);
            }
        }

            if(editCourse) {
              // console.log("Setcourse",Course);
              // console.log("setvalueCourseCategory",Course?.category?.name || Course?.category);
              setValue("courseName",Course.courseName)
              setValue("courseDescription",Course.courseDescription)
              setValue("price",Course.price)
              setValue("category",Course?.category)
              setValue("tag",Course.tag)
              setValue("thumbnail",Course.thumbnail)
              setValue("whatYouWillLearn",Course.whatYouWillLearn)
              setValue("instructions",Course.instructions)
            }

            getCategory();
        },[])


        const isFormUpdated = () => {
          const currentValues = getValues()
          console.log("Current value",currentValues);
          // console.log("changes after editing form values:", currentValues)
          if (
            currentValues.courseName !== Course.courseName ||
            currentValues.courseDescription !== Course.courseDescription ||
            currentValues.price !== Course.price ||
            currentValues.tag.toString() !== Course.tag.toString() ||
            currentValues.whatYouWillLearn !== Course.whatYouWillLearn ||
            currentValues.category._id || currentValues.category !== Course.category._id ||
            currentValues.instructions.toString() !== Course.instructions.toString() ||
            currentValues.thumbnail !== Course.thumbnail
          ) {
            return true
          }
          return false
        }

      
        
        const  SubmitCourseInfoForm = async(data) => {
          // setLoading(true)
          if (editCourse) {
            // const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if (isFormUpdated()) {
              const currentValues = getValues()
              console.log("current value", currentValues);
              const formData = new FormData()
              //  console.log(data)
              formData.append("courseId", Course._id)
              if (currentValues.courseName !== Course.courseName) {
                formData.append("courseName", data.courseName)
              }
              if (currentValues.courseDescription !== Course.courseDescription) {
                formData.append("courseDescription", data.courseDescription)
              }
              if (currentValues.price !== Course.price) {
                formData.append("price", data.price)
              }
              if (currentValues.tag.toString() !== Course.tag.toString()) {
                formData.append("tag", JSON.stringify(data.tag))
              }
              if (currentValues.whatYouWillLearn !== Course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.whatYouWillLearn)
              }
              if (currentValues.category._id !== Course.category._id) {
                // console.log("category",data.category);
                
                formData.append("category", data.category)
                formData.append("previousCategory",Course.category._id)
              }
              if ( currentValues.instructions.toString() !== Course.instructions.toString()) {
                formData.append( "instructions", JSON.stringify(data.instructions) )
              }
              if (currentValues.thumbnail !== Course.thumbnail) {
                formData.append("thumbnailUpload", data.thumbnail)
              }
              // console.log("Edit Form data: ", formData)
               setLoading(true)
              const result = await editCourseDetails(formData, token)
              console.log("result" ,result);
              // setLoading(false)
              if (result) {
                dispatch(SetStep(2))
                dispatch(SetCourse(result))
              }
            } else {
              toast.error("No changes made to the form")
            }
            console.log("data",Course);
            return
          }
      

            // e.preventDefault()
               console.log("data",data);
              // console.log("Category",data.category);
             
              // dispatch(SetStep(2))
              const formData = new FormData();
              formData.append("courseName" , data.courseName)
              formData.append("courseDescription" , data.courseDescription)
              formData.append("price" , data.price)
              formData.append("category" , data.category)
              formData.append("tag" , JSON.stringify(data.tag))
              formData.append("thumbnailUpload" , data.thumbnail)
              formData.append("status", COURSE_STATUS.DRAFT)
              formData.append("whatYouWillLearn" , data.whatYouWillLearn)
              formData.append("instructions" , JSON.stringify(data.instructions))

              try {
                //  CALL API TO CALL FUNCTION FOR CREATE COURSE
              const result = await addCourseDetail(formData, token)
              
              if(result){
                dispatch(SetCourse(result))
                 dispatch(SetStep(2))
              }
              console.log("Result", result);
              toast.success("Course Info Filled")
              } catch (error) {
                console.log("error while creating course", error.message);
                toast.error("Unable to Filled Course Info")
              }

              setLoading(false)
        }

        // console.log("after",Course);

  return (
    <>
     <form onSubmit={handleSubmit(SubmitCourseInfoForm)}>
      <div className="flex flex-col  justify-between gap-y-7 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12">
        
          <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="courseName" className="lable-style">
              <p>Course Title:</p>
            </label>
            <input
              type="text"
              placeholder="Enter Course Title"
              id="courseName"
              name="courseName"
              className="form-style"
              {...register("courseName", { required: true })}
            />
            {errors.courseName && <span className="-mt-1 text-[12px] text-yellow-100">Course Title is required</span>}
          </div>

          {/* Course desc */}
          <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="courseDescription" className="lable-style">
              <p>Course Short Description:</p>
            </label>
            <textarea
            rows={4}
              type="text"
              placeholder="Enter Description"
              id="courseDescription"
              name="courseDescription"
              className="form-style"
              {...register("courseDescription", { required: true })}
            />
            {errors.courseDescription && <span className="-mt-1 text-[12px] text-yellow-100">Course Description is required</span>}
          </div>

          {/* price */}
          <div className="flex flex-col gap-2 lg:w-full relative">
            <label htmlFor="price" className="lable-style">
              <p>Price:</p>
            </label>
            <HiOutlineCurrencyRupee className='absolute top-10 text-yellow-25 left-2 text-2xl '/>
            <input
              type="number"
              placeholder=" Enter Price"
              id="price"
              name="price"
              className="form-style !pl-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("price", { 
                required: true,
                valueAsNumber:{value:true, message:"Enter Numbers!"}
                 })}
            />
            {errors.price && <span className="-mt-1 text-[12px] text-yellow-100">Course Price is required</span>}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2 lg:w-full">
              <label htmlFor="category" className="lable-style">
                Category
              </label>
              <select
          {...register("category", { required: true })}
          defaultValue=""
          id="category"
          className="form-style w-full"
        >
        { !editCourse && 
          <option value="" disabled>
            Choose a Category
          </option>
        }
          
          {
            Category?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
              {errors.category && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Choose a Category.
                </span>
              )}
            </div>

            {/* tag */}
            
          <TagField
            type="text"
            name="tag"
            label="Tag:"
            id = "tag"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            placeholder="Enter Tag and Press Enter"
            editData = {editCourse ? Course?.tag : null}
          />


           {/* thumbnail */}
           
          <Upload
            type="file"
            name="thumbnail"
            label="Thumbnail:"
            id = "thumbnail"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            editData={editCourse ? Course?.thumbnail : null}
          />

            {/* Benefit of course */}
            <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="whatYouWillLearn" className="lable-style">
              <p>Benefit of the Course:</p>
            </label>
            <textarea
              type="text"
              placeholder="Enter Benefit of the Course"
              id="whatYouWillLearn"
              name="whatYouWillLearn"
              className="form-style"
              {...register("whatYouWillLearn", { required: true })}
            />
            {errors.whatYouWillLearn && <span className="-mt-1 text-[12px] text-yellow-100">Course Benefit is required</span>}
          </div>

          {/* requirement/Instruction */}
          {/* <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="requirement" className="lable-style">
              <p>Requirement/Instructions:</p>
            </label>
            <textarea
              type="text"
              placeholder="Instructions"
              id="requirement"
              name="requirement"
              className="form-style"
              {...register("requirement", { required: true })}
            />
            {errors.requirement && <span className="-mt-1 text-[12px] text-yellow-100">Instructions is required</span>}
          </div> */}
          <RequirementField
            type = "text"
            name="instructions"
            label="Requirement/Instruction"
            id = "instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            placeholder="Instruction"
            editData={editCourse ? Course?.instructions : null}
          />
      </div>
      
      <div className='flex justify-end items-end mt-7 gap-x-2'>
      {
        editCourse && <button className='flex items-cente bg-pure-greys-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ' 
        onClick={() => {
          // dispatch(SetEditCourse(true))
          dispatch(SetStep(2))}}>
          Continue Without Saving
          </button>
      }
      
      <IconButton 
        btntxt={!editCourse ? "Next" : "Save Changes"}
        //  btnHandler={handleSubmit}
        children={<MdKeyboardArrowRight/>}
         type="submit"
         disbaled={loading}
      />
      </div>
     
      </form>
    </>
  );
}

export default CourseInformationForm