import React from 'react'
import { TextField,Grid,InputAdornment,IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Input({name,label,autoFocus,type,handleChange,handleShowPassword,half}) {
  return (
    <>
    <Grid item xs = {12} sm = { half ? 6 : 12}>
        <TextField 
            name = {name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label = {label}
            autoFocus = {autoFocus}
            type = {type}
            InputProps={name === 'password'  ? {
                endAdornment : (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null} />

    </Grid>
    </>
  )
}
