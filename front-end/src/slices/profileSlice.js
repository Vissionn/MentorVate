import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    editProfile: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state , action) {
            state.user = action.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
          SetEditProfile: (state,action) =>  {
            state.editProfile = action.payload
        },
    },
});

export const {setUser,SetEditProfile} = profileSlice.actions;
export default profileSlice.reducer;