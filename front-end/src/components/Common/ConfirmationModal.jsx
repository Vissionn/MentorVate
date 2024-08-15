import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({data}) => {

    //  console.log("data" , data);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex flex-col items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
       <div className=' border bg-richblack-800 py-5 px-4 rounded-lg'>
       <div className=' flex flex-col gap-y-3 text-white'>
         <p>{data?.text1}</p>
         <p>{data?.text2}</p>
         </div>

         {/* buttons */}
         <div className='flex gap-x-8 mt-5 items-center justify-center'>
        
            {/* Action button in modal */}
            <IconButton btntxt={data?.btn1text} 
                btnHandler={data?.bntHandler1}
            />

           {/* Cancel button in Modal */}
           <button onClick={data?.bntHandler2} className='px-4 py-2 bg-richblack-50 text-black rounded-lg '>
            {data?.btn2text}
           </button>
        
         </div>
       </div>
         
       
    </div>
  )
}

export default ConfirmationModal