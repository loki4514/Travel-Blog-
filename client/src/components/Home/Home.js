import React, { useEffect, useState } from 'react'
import { AppBar, Container, Typography, Grow, Grid } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../reducers/posts'
import useStyles from './styles'



export default function Home() {
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
        <>
            <Grow in>
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
            </Grow>

        </>
    )
}
