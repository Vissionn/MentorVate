import React from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import { IoMdArrowRoundForward } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position,heading,subheading,btn1,btn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-20 max-w-maxContent`}>

    {/* Section1 */}
        <div className='flex flex-col w-[60%] gap-8'>
          {heading}
          <div className=' text-richblack-300 font-bold text-xl'>
              {subheading}
          </div>

                 
              <div className='flex    gap-7 mt-4'>
               <Button active={btn1.active}   linkto={btn1.linkto}>
               <div className='flex gap-2 items-center'>
                {btn1.btnText}
                <IoMdArrowRoundForward/>
               </div>
                </Button>
        
                <Button active={btn2.active}   linkto={btn2.linkto}>
               <div className='flex gap-2 items-center'>
                {btn2.btnText}
               </div>
                </Button>
              </div>
        
        </div>

        {/* Section2 */}
        <div className=' animatedCode h-fit flex flex-row w-[100%] px-5 lg:w-[500px] rounded-sm border-1'>
        {backgroundGradient}
           <div className='w-[5%] text-richblack-500 font-mono font-semibold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>

           </div>

          
           <div className={`w-[95%] ${codeColor} font-bold font-mono flex flex-col gap-2 `}>
           <TypeAnimation
            sequence={[codeblock , 2000 , ""]}
            cursor={true}
            repeat={Infinity}

            style={{
                whiteSpace:"pre-line",
                display:'block',
            }}
            omitDeletionAnimation={true}
           />
           </div>
        </div>
    </div>
    
  )
}

export default CodeBlocks