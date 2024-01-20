import { configureStore } from "@reduxjs/toolkit";
import postSlice from '../reducers/posts'
import auth from "../reducers/auth";
import auth1 from "../reducers/auth1";


const store = configureStore({
    
    reducer : {
        posts : postSlice,
        auth : auth,
        auth1 : auth1

    },
    
})


export default store