import React, { useEffect, useState } from 'react'
import { AppBar, Container, Typography, Grow, Grid } from '@mui/material'
import memories from './images/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './styles'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './reducers/posts'
import { BrowserRouter,Route,Routes } from 'react-router-dom'


export default function App() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null)
  const liked = useSelector((state) => state.posts.isLiked)
  const del = useSelector((state) => state.posts.isDeleted)


  useEffect(() => {
    console.log('Effect triggered');
    dispatch(getPosts())
  }, [currentId, dispatch, liked, del])

  return (
    <Container maxwidth='lg'>
      {/* <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h2' className={classes.heading} align="Center" >Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar> */}
      
      {/* Grow components which adds the animation  */}




      <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Use 'element' instead of 'Component', and capitalize 'component' */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>


      {/* <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={4} >
            <Grid item xs={12} md={6}  >
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} md={6}   >
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow> */}
      {/* <Home /> */}
    </Container>
  )
}
