import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isAuthenticated:false,
    },
    reducers:{
        login:(state,action)=>
        {
            state.isAuthenticated=true;
            console.log("slice data =" +state.isAuthenticated)
        },
        logout:(state,action)=>
        {
            state.isAuthenticated=false;
        }
    }
})

export const{login,logout}=authSlice.actions;
export default authSlice.reducer;