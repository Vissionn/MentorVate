import React from 'react'
import ChangeImage from './ChangeImage'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'



const Setting = () => {

  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Profile</h1>

        {/* section1 */}
        <ChangeImage/>

        {/* section2 */}
        <EditProfile/>
        
        {/* section 3 */}
        <ChangePassword/>

        {/* Section 4 */}
        <DeleteAccount/>
     
    </div>
  )
}

export default Setting