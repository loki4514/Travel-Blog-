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
                const user_data = jwtDecode(action.payload);
            // Modify the draft state using Immer
                state.authData = user_data;
            // Update localStorage outside of Immer
                localStorage.setItem('profile', JSON.stringify(user_data));
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

