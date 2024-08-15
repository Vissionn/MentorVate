import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeImageHandler } from '../../../../Services/operation/SettingApi'
import { setUser } from '../../../../slices/profileSlice'
import { FiUpload } from "react-icons/fi"
import IconButton from '../../../Common/IconButton'

const ChangeImage = () => {
    const {user} = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    //   console.log("user", user);
    const HiddenfileInput = useRef(null)
    const dispatch = useDispatch()
    const [imageFile, SetImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const [loading, setloading] = useState(false)
    // const token = user.token;

    const changeHandler = (data) => {
          console.log("Data",data);
        const fileUpload = data.target.files[0]
        console.log("file",fileUpload);
        if(fileUpload) {
            SetImageFile(fileUpload);
             previewFile(fileUpload)
        }
        // console.log("File", fileUpload);
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
      }


        const handleFileUpload = () => {
            try {
                setloading(true)
                const formData = new FormData()
                formData.append("displayPicture", imageFile)
                formData.append("timestamp", (Date.now() / 1000) | 0)
                console.log("formdata", formData);
                // setImageData(formData)
                dispatch(ChangeImageHandler(formData,token))
                setloading(false)
            } catch (error) {
                console.log("ERROR MESSAGE - ", error.message)
            }
        }

        useEffect(() => {
            if (imageFile) {
              previewFile(imageFile)
            }
          }, [imageFile])
   
    
  return (
    <div className="flex  items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12">
        <div className=' flex gap-x-4 items-center'>
            <div>
                <img src={ previewSource || user?.image}
                    alt={user?.firstName}
                    className=' aspect-square w-[78px] rounded-full'
                />
            </div>
            <div className='flex flex-col space-y-2 '>
                <p className='text-white text-base'>Change Profile Picture</p>
                <div className='text-white flex gap-x-2'>
                    <button onClick={(e) => {HiddenfileInput.current.click()}}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    disabled={loading}>Select</button>
                    <input type='file'
                        ref={HiddenfileInput}
                        onChange={changeHandler}
                        className=' hidden'
                    />
                    <IconButton btntxt={loading ? "Loading..." : "Upload"}
                    btnHandler={handleFileUpload}>
                    {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                     )}
                    </IconButton>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeImage