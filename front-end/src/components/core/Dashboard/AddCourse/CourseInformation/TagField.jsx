import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux'

const TagField = ({type,name,label,id,register,errors,getValues,setValue,placeholder,editData=null}) => {

    const [tag, Settag] = useState("")
    const [taglist, SettagList] = useState([])
    const {Course} = useSelector((state) => state.course)

    useEffect(() => {
      if (editData) {
        // console.log(course)
        SettagList(editData)
      }
        register(id, {required:true})
      },[])

      useEffect(() => {
        setValue(id , taglist)
      },[taglist])
    
        const EnterKeyHandler = (event) =>{
           
            if(event.key === "Enter") {
                event.preventDefault()
                // const Tags = event.target.value
                if(!taglist.includes(tag)){
                    SettagList([...taglist, tag])
                    Settag("")
                    // event.target.value=""
                }
                else {
                    toast.error("Tag Already in List")
                }
            }  
        }

        const RemoveTagHandler = (index) => {
            taglist.splice(index,1)
            SettagList([...taglist])
        }
    
  
    // console.log("Taglist",taglist);

  return (
    <div className="flex flex-col gap-2 lg:w-full">
            <label htmlFor="tag" className="lable-style">
              <p>{label}</p>
            </label>
            {/* render tag in UI */}
            <div className="flex w-full flex-wrap gap-y-2">
            {
                taglist.map((tags,index) => {
                    return(
                        <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm gap-x-1 text-richblack-5">
                        {/* {editData ? tags : tags} */}
                            {tags}
                            {/* remove tag button */}
                            <MdClose onClick={() => RemoveTagHandler(index)}></MdClose>
                        </div>
                    )
                })
            }
            </div>
            <input
              type="text"
              placeholder={placeholder}
              id={id}
              value={tag}
              onChange={(e) => {Settag(e.target.value)}}
              name={name}
              className="form-style"
              onKeyDown={EnterKeyHandler}
            //   {...register(id, { required: true })}
            />
            {errors[id] && <span className="-mt-1 text-[12px] text-yellow-100">Tag is required</span>}
          </div>
  )
}

export default TagField