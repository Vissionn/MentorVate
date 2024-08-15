import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import  Login from "./pages/Login"
import Navbar from "./components/Common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./components/core/Dashboard/Myprofile";
import Error from "./pages/Error";
import Sidebar from "./components/core/Dashboard/Sidebar";
import Dashboard from "./pages/Dashboard";
import Setting from "./components/core/Dashboard/Setting/Setting";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import CartIndex from "./components/core/Dashboard/Cart/CartIndex"
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import InstructorCourse from "./components/core/Dashboard/InstructorCourse/InstructorCourse";
import AddCourseIndex from "./components/core/Dashboard/AddCourse/AddCourseIndex";
import MyCourses from "./components/core/Dashboard/InstructorCourse/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import CatalogPage from "./pages/CatalogPage";
import CoursePage from "./pages/CoursePage";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {

  // const [isLoggedIn , SetIsLoggedIn] = useState(false)

  const {user} = useSelector((state) => state.profile)

  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar/>
  <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalog/:CatalogName" element={<CatalogPage/>} />
      <Route path="/courses/:id" element={<CoursePage/>} />
      <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute> }/>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute> }/>
      <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute> }/>
      <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute> }/>
      <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute> }/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>

      <Route  element={<PrivateRoute><Dashboard/></PrivateRoute> }>

           <Route path="/dashboard/my-profile" element={<Myprofile/>}/>
           <Route path="/dashboard/settings" element={<Setting/>}/>
        

           {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="/dashboard/cart" element={<CartIndex/>}/>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
              </>
            )
           }

           {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="dashboard/add-course" element={<AddCourseIndex/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                <Route path="/dashboard/instructor" element={<Instructor/>}/>
                {/* <Route path="/catalog/:CatalogName" element={<CatalogPage/>} /> */}
              </>
            )
           }

      </Route>

      <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
        )
      }
      </Route>
      
      <Route path="*" element={<Error/>}/>
    </Routes>
    </div>
  
  );
}

export default App;
