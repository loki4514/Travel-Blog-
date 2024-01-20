import { AppBar, Typography, Toolbar, Avatar, Button, Box, Grid, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memories from '../../images/memories.png'

import { useNavigate } from "react-router-dom";
import { logoutAuth } from "../../reducers/auth";


const Navbar = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    // const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const user_cred = useSelector(state => state.auth.authData);
    const [user, setUser] = useState(user_cred)

    useEffect(() => {
        // Check if user_cred exists before updating the state
        if (user_cred) {
            setUser(user_cred);
        }
    }, [location]);


    const logout = () => {
        dispatch(logoutAuth())
        navigate('/auth')
        setUser(null)

    }




    return (
        // <Box sx={{ flexGrow: 1 }}>
        <>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className={classes.brandContainer}>
                        <img className={classes.image} src={memories} alt="memories" height="50" />
                        <Typography variant='h4' nowrap className={classes.heading} >Travel Blog</Typography>
                    </div>
                    <Toolbar className={classes.toolbar} style={{ marginLeft: 'auto' }}>
                        {user ? (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
                                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>

                            </div>
                        ) : (


                            <Button component={Link} to="/auth" variant="contained" color="primary" style={{ marginLeft: 'auto' }}>
                                Sign In
                            </Button>

                        )}



                    </Toolbar>
                </Container>
            </AppBar>



        </>

    )
}

export default Navbar