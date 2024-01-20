import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Posts = ({currentId,setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts.posts);
    console.log("this is the post",posts);
    console.log(posts.length)
    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
            {console.log(posts)}
            {posts.map((post) => (
                
                <Grid item key={post._id} xs={12} sm={6}>
                    <Post post={post} currentId = {currentId} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
