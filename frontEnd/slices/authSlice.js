import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null 
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state, action) => {
           state.userInfo = action.payload;
           localStorage.setItem("userInfo", JSON.stringify(action.payload));
          },
          removeUser: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
          }
    },

})
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;