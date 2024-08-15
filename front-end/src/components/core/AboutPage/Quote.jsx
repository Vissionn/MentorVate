import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl leading-10 font-semibold font-inter mx-auto mt-24  text-center py-[90px] px-[120px] text-richblack-100  max-w-[1500px]">
      <RiDoubleQuotesL /> We are passionate about revolutionizing the way we
      learn. Our innovative platform{" "}
      <HighlightText text={"combines technology"} />,{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        {" "}
        expertise
      </span>
      , and community to create an
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {" "}
        unparalleled educational experience.
        
      </span>
      <div className="relative">
      <RiDoubleQuotesR  className="absolute right-10 mr-14  "/>
      </div>
    
    </div>
    
  );
};

export default Quote;
