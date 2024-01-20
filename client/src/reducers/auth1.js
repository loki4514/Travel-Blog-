import { createSlice, createAsyncThunk, autoBatchEnhancer } from "@reduxjs/toolkit";
import {signInApi,signUpAPi} from '../api/index.js'



const initialState = {
    authData1: null,
};

export const authSlice1 = createSlice({
    name: 'auth1',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.authData1 = action.payload;
            localStorage.setItem('authToken', JSON.stringify(action.payload));
            // console.log(action.payload);
        },
        signup: (state, action) => {
            state.authData1 = action.payload;
            localStorage.setItem('authToken', JSON.stringify(action.payload));
            // console.log('Handling signup action with payload:', action.payload);
            // state.authData1 = action.payload;  // Assuming action.payload is the user data
        },
    },
});


export const { signin, signup } = authSlice1.actions;
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



