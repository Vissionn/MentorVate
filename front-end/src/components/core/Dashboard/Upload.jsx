import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdCloudUpload } from "react-icons/md";
import {useDropzone} from 'react-dropzone'
import { FiUploadCloud } from "react-icons/fi"
import "video-react/dist/video-react.css"
import { Player } from "video-react"

const Upload = ({type,name,label,id,register,errors,setValue,getValues, video=false ,viewData = null,
    editData = null,}) => {

     const inputRef = useRef(null)
     const [previewSourse, SetPreviewSource] = useState(viewData ? viewData : editData ? editData : "")
     const [imagefile, SetImageFile] = useState(null)

    useEffect(() => {
        register(id, {required:true})
    },[])

    useEffect(() => {
        setValue(id, imagefile)
    },[imagefile])

    const onDrop = (acceptedfiles) => {
        const file = acceptedfiles[0]
        // console.log("file",file);
        if(file) {
            SetImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            SetPreviewSource(reader.result)
        }
    }

    // console.log("Preview",previewSourse);

    const{getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
        onDrop})
   

  return (
    <div className="flex flex-col gap-2 lg:w-full max-h-fit">
            <label htmlFor="thumbnail" className="lable-style">
              <p>{label}</p>
            </label>

            {/* <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div> */}

          <div className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex max-h-fit cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
          {
            previewSourse ? (
                <div className="flex w-full flex-col p-1">
                    {!video ? (
                        <div>
                            <img src={previewSourse}
                                alt='preview'
                                className="h-full w-full rounded-md object-cover"
                            />
                        </div>
                    ) : (
                        <Player aspectRatio='16:9' playsInline src={previewSourse}/>
                    )}    
                    {/* {!viewData && (
              <button
                type="button"
                onClick={() => {
                  SetPreviewSource("")
                  SetImageFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )} */}
                </div>
            ) : 
            (
                <div {...getRootProps()} 
          >

            <div className='flex flex-col justify-center items-center' >
            <MdCloudUpload className=' cursor-pointer text-white  text-[50px] mb-4' width="200px"/>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
            </div>
            
            <input
              ref={inputRef}
              {...getInputProps()}
            />
            </div>
            )
          }
          </div>

          <div className='flex mt-2 justify-end'>
                        {!viewData && <div className=' cursor-pointer bg-yellow-100 text-black px-2 py-3 rounded-md  text-center max-w-[90px] ' onClick={(e) =>
                        { 
                        SetPreviewSource("")
                        SetImageFile(null)
                        setValue(id,null)
                        }}>Cancel</div>}
                        </div> 
        
          
         

            {errors[id] && <span className="-mt-1 text-[12px] text-yellow-100">{name} is required</span>}
   </div>
  )
}

export default Upload