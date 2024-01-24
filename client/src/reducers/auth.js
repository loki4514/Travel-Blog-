import { createSlice, createAsyncThunk, autoBatchEnhancer } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";



const initialState = {
    authData: JSON.parse(localStorage.getItem("profile")),
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setAuthData(state,action) {
            // if (state.authData !== null) {
                // console.log("this is authata",state.authData)
                // console.log("this is action",action.payload)
                // const user_data = jwtDecode(action.payload);
            // Modify the draft state using Immer
                state.authData = action.payload;
            // Update localStorage outside of Immer
                localStorage.setItem('profile', JSON.stringify(action.payload));
            // }
        
        },
        logoutAuth(state,action){
            localStorage.removeItem('profile')
            state.authData = null
            
            
        }
    }
})

export const { setAuthData,logoutAuth} = authSlice.actions;
export default authSlice.reducer;

