import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {

    const [time, Settime] = useState("")

  // Helper function to convert total seconds to the duration format
  useEffect(() => {
    function convertSecondsToDuration(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor((totalSeconds % 3600) % 60);
    
        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
          return `${minutes}m ${seconds}s`;
        } else {
          return `${seconds}s`;
        }
      }
    
      const duration = subSec?.timeDuration
      var res = convertSecondsToDuration(duration)
      if(res) {
        Settime(res)
      }
    
  },[])

  return (
    <div>
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.title}</p>
        </div>

        <div>
            {time}
        </div>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion
