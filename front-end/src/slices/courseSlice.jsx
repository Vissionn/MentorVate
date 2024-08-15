import { createSlice} from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const initialsState = {
    step:1,
    Course: localStorage.getItem("Course") ? JSON.parse(localStorage.getItem("Course")) : null,
    editCourse: false,
    paymentLoading: false,
}

const courseSlice = createSlice({
    name:"course",
    initialState: initialsState,
    reducers:{
        SetStep: (state,action) => {
            state.step = action.payload
        },
        SetCourse: (state,action) => {
            state.Course = action.payload
        },
        SetEditCourse: (state,action) => {
            state.editCourse = action.payload
        },
        SetPaymentLoading: (state,action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.Course = null
            state.editCourse = false
        }
    }
})

export const {SetStep,SetCourse,SetEditCourse,SetPaymentLoading,resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;