import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from '../../../Services/operation/AuthApi'
import useOnClickOutside from '../../../hooks/useOnClickOutside'

const ProfileDropDown = () => {

  const {user} = useSelector((state)=> state.profile)
  const [open , Setopen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef()
  //  console.log("user", user.User.image);

  useOnClickOutside(ref, () => {Setopen(false)})

 

  return (
    <button  className='relative' onClick={() => Setopen(true)} >
      <div className='flex items-center gap-1'  >
      <img src={user?.image} className=' rounded-full w-[30px] object-contain aspect-square'/>
      <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {
        open && (
          <div  className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800" onClick={(e) => e.stopPropagation()} ref={ref}>
          <Link to="/dashboard/my-profile" onClick={() => Setopen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              Setopen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
          </div>
          
        )
      }
    </button>
  )
}

export default ProfileDropDown