import React, { useEffect, useState } from "react";
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../reducers/posts";
import { updatedPost } from "../../reducers/posts";
import { fetchPosts } from "../../api";

const Form = ({ currentId, setCurrentId }) => {

    const dispatch = useDispatch()
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles()
    const [postData, setPostData] = useState({
        // creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''

    })

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId !== null) {
            
            dispatch(updatedPost({ ...postData,name : user?.result?.name }))
            clear()
        }
        else {
            dispatch(createPost({...postData,name : user?.result?.name }));
            clear()
        }

        // Additional logic if needed
    };

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's
                </Typography>

            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            // creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };
    
    return (
        <>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                    {/* <TextField name="creator" variant="outlined" label='Creator' value={postData.creator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                        // everytime you change creator spread the data dummy
                        fullWidth /> */}
                    <TextField name="title" variant="outlined" label='Title' value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        // everytime you change creator spread the data dummy
                        fullWidth />
                    <TextField name="message" variant="outlined" label='Message' value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        // everytime you change creator spread the data dummy
                        fullWidth />
                    <TextField name="tags" variant="outlined" label='Tags' value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                        // everytime you change creator spread the data dummy
                        fullWidth />
                    <div className={classes.fileInput}>
                        <FileBase
                            type='file'
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type="submit" style={{ marginTop: '10px' }} fullWidth>
                        Submit
                    </Button>

                    <Button variant="contained" color='secondary' size='small' onClick={clear} style={{ marginTop: '10px' }} fullWidth>
                        Clear
                    </Button>
                </form>

            </Paper>
        </>
    )
}

export default Form