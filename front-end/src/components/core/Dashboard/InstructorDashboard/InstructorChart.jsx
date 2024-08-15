import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie,Doughnut} from "react-chartjs-2"

Chart.register(...registerables)
const InstructorChart = ({courses}) => {
    console.log("courses",courses)
  const [currentChart, SetCurrentChart] = useState("student");

  const getRandomColors = (colorsNumber) => {
    let Colors = [];
    for (let i = 0; i < colorsNumber; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;

      Colors.push(color);
    }
    return Colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course?.CourseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course?.CourseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmount),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const options = {
     maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Visualize</p>
        <div className="space-x-4 font-semibold">
            <button 
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "student"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`} onClick={() => SetCurrentChart("student")}>Student</button>

            <button  
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "Income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`} onClick={() => SetCurrentChart("Income")}>Income</button>

        </div>
        <div className="relative mx-auto aspect-square h-full w-full">
            <Doughnut
                data={currentChart === "student" ? chartDataStudents : chartIncomeData}
                options={options}
            />
        </div>
    </div>
  )
}

export default InstructorChart