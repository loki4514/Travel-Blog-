import { createSlice, createAsyncThunk, autoBatchEnhancer } from "@reduxjs/toolkit";
import {signInApi,signUpAPi} from '../api/index.js'



const initialState = {
    authData: JSON.parse(localStorage.getItem("profile")),
};

export const authSlice1 = createSlice({
    name: 'auth1',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.authData = action.payload;
            localStorage.setItem('profile', JSON.stringify(action.payload));
            // console.log(action.payload);
        },
        signup: (state, action) => {
            state.authData = action.payload;
            localStorage.setItem('profile', JSON.stringify(action.payload));
            // console.log('Handling signup action with payload:', action.payload);
            // state.authData1 = action.payload;  // Assuming action.payload is the user data
        },
        logoutAuth1(state,action){
            localStorage.removeItem('profile')
            state.authData = null
            
            
        }
    },
});


export const { signin, signup,logoutAuth1 } = authSlice1.actions;
export default authSlice1.reducer;


export const signinauth = createAsyncThunk('/user/signin', async ({ formData, navigate }, { dispatch }) => {
    try {

        const { data } = await signInApi(formData);
        console.log("your are inside singin auth", data);
        dispatch(signin(data));
        navigate('/')



    } catch (error) {
        console.error("Error:", error.message);
        console.error(error);
        throw error;
    }
});

export const signupauth = createAsyncThunk('/users/signup', async ({ formData, navigate }, { dispatch }) => {
    try {
        console.log("receive data",formData)
        const { data } = await signUpAPi(formData);
        console.log("Inside signupauth async thunk", data);
        dispatch(signup(data));
        navigate('/');
    } catch (error) {
        console.error("Error:", error.message);
        console.error(error, "Error in signupauth async thunk");
        throw error;
    }
});



