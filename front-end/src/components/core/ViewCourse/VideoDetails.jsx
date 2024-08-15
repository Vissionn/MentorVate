import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/ViewCourseSlice'
import { BigPlayButton, Player } from "video-react"
import "video-react/dist/video-react.css"
import IconButton from '../../Common/IconButton'
import { markLectureAsComplete } from '../../../Services/operation/CourseDetailsApi'

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const playerRef = useRef(null)
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { courseSectionData, courseEntireData, completedLectures } =
      useSelector((state) => state.viewCourse)
  
    const [videoData, setVideoData] = useState([])
    const [previewSource, setPreviewSource] = useState("")
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(() => {
            if(!courseSectionData.length) {
                return
            }
            if(!courseId && !sectionId && !subSectionId) {
                return navigate("/dashboard/enrolled-courses")
            }

            const Section = courseSectionData.filter((section) => section?._id === sectionId)
            const videoToShow = Section[0]?.SubSection.filter((subsection) => subsection?._id === subSectionId)

            setVideoData(videoToShow?.[0])
            setPreviewSource(courseEntireData.thumbnail)
            setVideoEnded(false)

        })()
    },[courseEntireData,courseSectionData,location.pathname])

    const isFirstVideo = () =>{
        const currentSectionIndex = courseSectionData.findIndex((section) => section?._id === sectionId)
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.findIndex((subsection) => subsection?._id === subSectionId)

        // setVideoData(courseSectionData?.[currentSectionIndex]?.SubSection?.[currentSubSectionIndex]?._id)

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true
        }
        else {
            return false
        }
    }

    
    const isLastVideo = () =>{
        const currentSectionIndex = courseSectionData.findIndex((section) => section?._id === sectionId)
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.findIndex((subsection) => subsection?._id === subSectionId)

        // setVideoData(courseSectionData?.[currentSectionIndex]?.SubSection?.[currentSubSectionIndex]?._id)

        if((currentSectionIndex === courseSectionData.length - 1) && (currentSubSectionIndex === courseSectionData[currentSectionIndex]?.SubSection.length - 1)) {
            return true
        }
        else {
            return false
        }
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section?._id === sectionId)
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.findIndex((subsection) => subsection?._id === subSectionId)

        const NoOfSubSection = courseSectionData[currentSectionIndex]?.SubSection.length

        // same section ki next video
        if(currentSubSectionIndex !== NoOfSubSection - 1) {
            const NextSubSectionId = courseSectionData[currentSectionIndex]?.SubSection[currentSubSectionIndex + 1]?._id
            // console.log("hello");
            
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${NextSubSectionId}`)
        }

        // next section ki phli video
        else{
            const NextSectionId = courseSectionData[currentSectionIndex + 1]?._id 
            // console.log("nextsectionId",NextSectionId);
            
            const NextSubSectionId = courseSectionData[currentSectionIndex + 1]?.SubSection[0]?._id
            // console.log("nextSubsectionId",NextSubSectionId);

            navigate(`/view-course/${courseId}/section/${NextSectionId}/sub-section/${NextSubSectionId}`)
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section?._id === sectionId)
        // console.log("current",currentSectionIndex);
        
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.findIndex((subsection) => subsection?._id === subSectionId)
        // console.log("current",currentSubSectionIndex);

        const NoOfSubSection = courseSectionData[currentSectionIndex]?.SubSection?.length

        // same section ki prev video
        if(currentSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.SubSection[currentSubSectionIndex - 1]?._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        // next section s prev section ki last video
        else {
            const PrevSectionId = courseSectionData[currentSectionIndex - 1]?._id 
            const LastSubsectionLength = courseSectionData[currentSectionIndex - 1]?.SubSection?.length
            const LastSubSectionId = courseSectionData[currentSectionIndex - 1]?.SubSection[LastSubsectionLength - 1]?._id

            navigate(`/view-course/${courseId}/section/${PrevSectionId}/sub-section/${LastSubSectionId}`)
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true)
        const res = await markLectureAsComplete(
          { courseId: courseId, subsectionId: subSectionId },
          token
        )
        if (res) {
          dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
      }
  
  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconButton
                  disabled={loading}
                  btnHandler={() => handleLectureCompletion()}
                  btntxt={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconButton
                disabled={loading}
                btnHandler={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    playerRef?.current?.play()
                    setVideoEnded(false)
                  }
                }}
                btntxt="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails