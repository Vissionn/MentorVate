import React from "react";
import instructorImg from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import Button from "./Button";
import { IoMdArrowRoundForward } from "react-icons/io";

const InstructorSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-[98px] mt-20">
      <div className="lg:w-[50%]">
        <img
          src={instructorImg}
          className="shadow-white shadow-[-20px_-20px_0_0]"
        />
      </div>

      <div className="flex flex-col gap-6 lg:w-[50%]">
        <h1 className="text-white text-4xl font-semibold lg:w-[50%]">
          Become an
          <HighlightText text={"Instructor"} />
        </h1>
        <p className="font-inter font-medium text-base text-richblack-300">
          Instructors from around the world teach millions of students on
          MentorVate. We provide the tools and skills to teach what you love.
        </p>
        <div className=" mt-6 max-w-[211px]">
          <Button active={true} linkto={"/signup"}>
            <div className="flex flex-row items-center gap-2">
              Start Teaching Today
              <IoMdArrowRoundForward />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
