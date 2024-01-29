import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material'
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { AUTH } from '../constants/actionTypes';
import { setAuthData } from '../../reducers/auth';
import useStyles from './styles'
import Input from './Input';
import Icon from './icon'
import { useNavigate } from 'react-router-dom';
import { signinauth,signupauth } from '../../reducers/auth1';

export default function Auth() {
  const initialState = {firstName:'',lastName:'', email : '',password:'',confirmpassword : ''}
  const [isSignup,setIsSignUp] = useState(false)
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [formData,setFormData] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('this is regarding',isSignup)
    if (isSignup){
      console.log('Dispatching signupauth with formData:', formData);
        dispatch(signupauth({formData,navigate}))
        console.log("user in the sign up received form data",formData)
        
    } else {
      dispatch(signinauth({formData,navigate}))
      console.log("user in the sign in received form data",formData)

    }


    console.log(formData)

  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})

  }

  const handleShowPassword = () => {
    setShowPassword((prevpassowrd) => !prevpassowrd)
  }

  const switchMode = () => {
    setIsSignUp((prevflag) => !prevflag)

  }
  const googleSucess = async (res) => {
    
    
      // if profile obj exists it returns or else it throws an error
    // const token = jwtDecode(res.credential).jti
    // console.log("this is token", token)
  

    try {
          console.log(res)
          const token = res.credential
          const result = jwtDecode(token)
          dispatch(setAuthData({token,result}))
          navigate('/')
    }catch (error){
      console.log("error dispatching", error)

    }
   

  }
  const googleFailure = (error) => {
    console.error('Sign-in failed:', error);
      
      
  }


  return (
    <Container component='main' maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockClockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  {/* <Grid xs = {6} md = {12}>
                    <TextField name='firstName' lable='First Name' handleChange={handleChange} autoFocus xs={6} />
                  </Grid>
                  <Grid xs = {6} md = {12}>
                    <TextField name='lastName' lable='Last Name' handleChange={handleChange} autoFocus xs={6} />
                  </Grid> */}
                  {/* From code lot of repetative code which makes code unclean let's the generalize the text feild dummy to make 
                  more cleaner code */}
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half />

                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword} />
            {isSignup &&
              <Input name='confirmpassword' label='Confirm Password' handleChange={handleChange} type='password' />}

          </Grid>
          
          <Button type='submit' fullWidth variant='contained' color='primary' style={{ marginTop: '15px', marginBottom : '15px' }}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
          
            clientId='282872334993-nd7f60uaf0hfnukni8q2b3eresn1v0r5.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button 
              style={{ marginTop: '15px' }}
              className={classes.googleButton} 
              color='primary' 
              fullWidth 
              onClick={renderProps.onClick} 
              disabled = {renderProps.disabled}
              startIcon={<Icon />} 
              variant='contained'

              >Google {isSignup ? 'Sign Up' : 'Sign In'}</Button>
            ) }
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
            plugin_name = 'dont work'
            />
      
          <Grid container justify = 'center'>
            <Grid item style={{ marginTop: '15px', textAlign: 'center' }}>
                  <Button onClick={switchMode} style={{ marginTop: '15px', textAlign: 'center' }}>
                    {isSignup ? 'Already Have an account? Sign In' : 'Don\'t have account? Sign Up'}
                  </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
