import React, { useEffect, useState } from 'react'
import IconButton from '../../../../Common/IconButton'

const RequirementField = ({type,name,label,id,register,errors,setValue,getValues,placeholder,editData=null}) => {


    const [requirement, SetRequirement] = useState("")
    const [requirementlist , SetRequirementlist] = useState([])

    // const changeHandler = (event) => {
    //     SetRequirement(event.target.value)
    // }

    useEffect(() => {
      if(editData) {
        SetRequirementlist(editData)
      }
      register(id, {required:true})
    },[])

    //....... jb bhi requirement list change ho rhi hogi to Setvalue vala function/hook requirement/instruction wali field ko setKrdega new values s....esa krna esliye jaruri tha kyuki data to form m, wo hi send hoja jo requirement ki input field m hoga...kyuki jb hum type krke add kr rhe th to data input field s hatt kr neche add hota ja rha tha....aagr esa nhi krenge to Instruction field is required error dikhayega jb bhi hum data send kr rhe honge............
    useEffect(() => {
      setValue(id, requirementlist)
    },[requirementlist])

  const AddHandlerRequest=(e) =>{
     e.preventDefault()
    // console.log("data",data);
    SetRequirementlist([...requirementlist, requirement])
    console.log("form",requirementlist);
    SetRequirement("")
  }

  const RemoveHandlerRequest = (item) => {
    //  e.preventDefault()
    // console.log("item",e.target.value);
    const requirementList = [...requirementlist]
      const UpdatedRequirementList = requirementList.filter((list) => list !== item)
      console.log("NewList",UpdatedRequirementList);
      SetRequirementlist(UpdatedRequirementList)
   
  }


  
  
  return (
    <>
        <div className="flex flex-col gap-2 lg:w-full">
        
        <label htmlFor={name} className='lable-style'>{label}</label>
            <input 
            type="text"
            name={name}
            id={id}
            value={requirement}
            onChange={(e) => SetRequirement(e.target.value)}
            placeholder={placeholder}
            className='form-style'
            // {...register("requirement", {required:true})}
             />
             {errors[id] && <span className="-mt-1 text-[12px] text-yellow-100">Instruction is required</span>} 

           <button className={`flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 lg:max-w-[15%] w-fit`} onClick={AddHandlerRequest}>
            Add 
           </button>

           <div>
            {requirementlist.map((item , i) => {
                return(
                    <div key={i} className='text-white flex gap-x-2'>
                      
                     {item}

                      {item !== "" && <button className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 max-w-[15%]' 
                      onClick={(e) => {
                       e.preventDefault()
                      RemoveHandlerRequest(item)
                      }}
                      >Clear
                      </button> } 
                    
                    </div>
                )
            })}
           </div>
       
          
        
    </div>
</>
   
  )
}

export default RequirementField