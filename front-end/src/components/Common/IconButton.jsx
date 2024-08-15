import React from 'react'

const IconButton = ({btntxt,btnHandler,disbaled,children,outline=false,customClasses,type}) => {
  return (
    <button
    onClick={btnHandler}
    disabled={disbaled}
    className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}>
        {
            children ? (<>
            {/* <> </> esko fragment bolte h agr tum bdi(parent) level div nhi banana chahte to esko use kr skte ho */}
                <span className={`${outline && "text-yellow-50"}`}>{btntxt}</span> 
                {children}
            </>) 
             : (btntxt)
        }
    </button>
  )
}

export default IconButton