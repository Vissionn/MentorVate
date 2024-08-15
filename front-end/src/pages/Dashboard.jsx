import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

    const {loading : AuthLoading} = useSelector((state) => state.auth)
    const {loading : ProfileLoading} = useSelector((state) => state.profile)

    if(AuthLoading || ProfileLoading) {
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div className='relative flex sm:flex-row flex-col sm:min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>
    <div className='sm:h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <Outlet/>
      </div>
       
    </div>
    </div>
  )
}

export default Dashboard