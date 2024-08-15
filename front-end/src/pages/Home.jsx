import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import Button from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSlider from "../components/core/HomePage/ReviewSlider";
import Footer from "../components/Common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* Section1 */}
      <div className="relative mx-auto flex flex-col items-center justify-between text-white max-w-maxContent">
        <Link to={"/signup"}>
          <div className="  group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex px-10 py-[5px]  gap-2 rounded-full items-center  transition-allduration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <IoMdArrowRoundForward />
            </div>
          </div>
        </Link>

        <div className=" text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="w-[90%] text-center text-lg text-richblue-50 mt-5">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8 ">
          <Button active={true} linkto={"/signup"}>
            Learn More
          </Button>

          <Button active={false} linkto={"/login"}>
            Book a Demo
          </Button>
        </div>

        <div className=" drop-shadow-sm shadow-caribbeangreen-400 mx-3 my-12 ">
          <video
            muted
            loop
            autoPlay
            width={1100}
            className="shadow-[22px_18px_0px_-5px_rgba(221,_221,_221,_1),_1px_-40px_50px_-55px_rgba(220,_207,_245,_0.8)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold w-[90%]">
                Unlock your <HighlightText text={"coding potential"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>>
                                      <html>
                                 <head>
                                 <title>Example</title>
                                 <linkrel="stylesheet"href="styles.css">
                                 </head>
                                 <body>
                                 <h1><a href="/">Header</a></h1>`}
            codeColor={"text-yellow-50"}
            backgroundGradient={<div className="codeblock1"></div>}
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse sm:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold w-[90%]">
                Start <HighlightText text={"coding in Seconds"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            btn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>>
                          <html>
                     <head>
                     <title>Example</title>
                     <linkrel="stylesheet"href="styles.css">
                     </head>
                     <body>
                     <h1><a href="/">Header</a></h1>`}
            codeColor={"text-yellow-50"}
            backgroundGradient={<div className="codeblock2"></div>}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section2 */}

      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px] flex items-center justify-center">
          <div className="w-11/12 max-w-maxContent flex justify-center gap-7 mt-36">
            <Button active={true} linkto={"/signup"}>
              <div className=" flex flex-row gap-2 items-center">
                Explore Full Category
                <IoMdArrowRoundForward />
              </div>
            </Button>

            <Button active={false} linkto={"/login"}>
              learn More
            </Button>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-7 justify-center items-center">
          <div className="flex flex-row gap-3 mt-20">
            <div className=" text-4xl font-inter font-semibold w-[594px] h-[88px]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>

            <div className="flex flex-col font-inter text-lg text-richblack-700 gap-6 w-[594px]">
              <p>
                The modern MentorVate is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>

              <div className=" pt-9 max-w-[137px]">
                <Button active={true} linkto={"/login"}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <TimelineSection
            backgroundGradient={<div className="timelineImageGradient"></div>}
          />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section3 */}
      <div className="mx-auto my-20 w-11/12 max-w-maxContent bg-richblack-900 flex-col items-center justify-between gap-8">
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8 text-white">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
