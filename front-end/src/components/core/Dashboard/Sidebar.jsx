import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links'
import { Link, matchPath, matchRoutes, NavLink, useLocation, useNavigate } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { logout } from '../../../Services/operation/AuthApi'
import ConfirmationModal from '../../Common/ConfirmationModal'
import { SetEditProfile } from '../../../slices/profileSlice'

const Sidebar = () => {

    const {loading : AuthLoading} = useSelector((state) => state.auth)
    const {user, loading : ProfileLoading} = useSelector((state) => state.profile)
    // console.log("user" , user);

    const dispatch = useDispatch()
    const location = useLocation()
    const [confirmModal, SetConfirmModal] = useState(null)
    const navigate = useNavigate();

    if(AuthLoading || ProfileLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const MatchRoute = (route) => {
       return matchPath({path:route}, location.pathname);
      }

    



  return (
    <div >

       
      <div className='flex flex-col sm:min-w-[222px] border-r-[2px] border-r-richblack-700 sm:h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

      {/* sidebar option */}
      <div className='flex flex-col text-white'>
      {
        sidebarLinks.map((link,index) => {
            const Icon = Icons[link?.icon]
            if(link?.type && link?.type !== user?.accountType) return null
            return (
                <NavLink to={link.path} className={`relative font-medium px-8 py-2 text-sm ${MatchRoute(link?.path) ? " bg-yellow-800" :" bg-opacity-0"}`}>
                <span className={`absolute left-0  top-0 w-[0.15rem] h-full bg-yellow-50 
                ${MatchRoute(link?.path) ? " opacity-100" : "opacity-0" }`}></span>

                <div className=' flex gap-x-2 items-center'>
                  
                    <Icon/>
                    <div>{link.name}</div>
                  
                </div>
                </NavLink>
                
            )
        })
      }
      </div>

      {/* horizontal line */}
      <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

      {/* setting and logout option */}
      <div className='flex flex-col gap-y-3 px-8'>
         {/* setting */}
        <div className='flex gap-x-1 text-white cursor-pointer' onClick={() => {
          navigate("dashboard/settings")
          dispatch(SetEditProfile(true))}}>
        <IoSettingsOutline/>
        Setting
        </div>

        {/* logout */}
        <button onClick={()=> {
             SetConfirmModal({
            text1:"Are You Sure ?",
            text2: "You will be Logged Out For Your Account !",
            btn1text:"Logout",
            btn2text: "Cancel",
            bntHandler1: () => { dispatch(logout(navigate))},
            bntHandler2: () => {SetConfirmModal(null)},

           })
        }}>
            <div className='flex gap-x-1 text-white'>
            <VscSignOut/>
            <span className='font-md text-sm'>Log Out</span>
            </div>
        </button>

      </div>

      </div>

      {/* Modal visbility */}
      {confirmModal && <ConfirmationModal data={confirmModal}/>}

    </div>
  )
}

export default Sidebar