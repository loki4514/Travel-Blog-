import React from "react";
import useStyles from './styles'
import { Card, CardActions, CardMedia, CardContent, Button, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import { likedPost,deleteddPost,getPosts } from "../../../reducers/posts";
import { useDispatch } from "react-redux";

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user?.token, "this will return undefined")
    const likes = () => {


    }
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            
            <div className={classes.overlay2}>
            {(user?.result?.email === post.creator || user?.result?.email === post?.creator) && (
                <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            )}
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" comment= "p"  style={{ textAlign: 'justify' }} >{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color='primary' onClick={() => dispatch(likedPost(post._id))} >

                    <ThumbUpIcon fontSize='small'>

                        
                    </ThumbUpIcon>
                    &nbsp; Like {post.likes.length }
                </Button>
                {(user?.result?.email === post.creator || user?.result?.email === post?.creator) && (
                <Button size="small" color='primary' onClick={() => dispatch(deleteddPost(post._id))} >
                    <DeleteIcon fontSize='small' />
                        Delete
                    
                </Button>
                )}
            </CardActions>

        </Card>
    )
}

export default Post