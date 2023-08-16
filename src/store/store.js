import {configureStore} from "@reduxjs/toolkit";
import authUser from "./slice/authslice" 

const store=configureStore({
    reducer:{
        auth:authUser,

    }
})

export default store;