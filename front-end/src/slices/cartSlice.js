import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
      addToCart : (state, action) => {
         const Course = action.payload;
         const Index = state.cart.findIndex((item) => item._id === Course._id )

         if(Index >=0) {
            toast.error("Course already in Cart")
            return
         }

         // If course is not in Cart then Add it into Cart
         state.cart.push(Course)

         // update the total items
         state.totalItems++
         // update the total amount
         state.total += Course.price

         // Update Local Storage
         localStorage.setItem("cart", JSON.stringify(state.cart))
         localStorage.setItem("total", JSON.stringify(state.total))
         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

         // toast for success
         toast.success("Course added to Cart ")
      } ,

      removeFromCart: (state,action) => {
        const Course = action.payload
        const Index = state.cart.findIndex((item) => item._id === Course._id)

        // if course found remove it
        if(Index >= 0) {
            state.cart.splice(Index,1)
            state.totalItems--
            state.total -= Course.price

            // Update Local Storage
         localStorage.setItem("cart", JSON.stringify(state.cart))
         localStorage.setItem("total", JSON.stringify(state.total))
         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

          // toast for success
          toast.success("Course Remove From Cart ")
        }
      },
      resetCart: (state) => {
        state.cart = []
        state.total = 0
        state.totalItems = 0
        // Update to localstorage
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")
      },
    },
});

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;