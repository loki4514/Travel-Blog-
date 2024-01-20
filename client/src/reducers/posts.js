import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPost as apiCreatePost, updatePost as apiUpdatePost, likePost, deletePost } from '../api/index.js';

const initialState = {
    isDeleted: false,
    posts: [],
    isLiked: false
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        addPost(state, action) {
            state.posts = [...state.posts, action.payload]
        },
        update(state, action) {
            const updatedPost = action.payload;
            // Find the post in the state by ID and update it

            state.posts = state.posts.map(post => (post._id === updatedPost._id ? updatedPost : post));
            // if post id equal to updated post id return updatedpost else return the previous post
            
        },
        like(state, action) {
            const postliked = action.payload;
            // Find the post in the state by ID and update it

            state.posts = state.posts.map(post => (post._id === postliked._id ? postliked : post));
            // state.posts = [...state.posts];
            state.isLiked = true;
            
            

        },
        deletepost(state, action) {
            console.log(action.payload)

            state.posts = state.posts.filter((post) => post._id !== action.payload)  
            console.log('inside the reducer',state.posts)
            // state.posts = [...state.posts];
            state.isDeleted = true

        },
        resetFlags(state) {
            state.isDeleted = false;
            state.isLiked = false;
        }




    },
});

export const { setPosts, addPost, update, like, deletepost,resetFlags } = postSlice.actions;
export default postSlice.reducer;

export const getPosts = createAsyncThunk('posts/getPosts', async (_, { dispatch }) => {
    try {
        const { data } = await fetchPosts();
        dispatch(setPosts(data));
    } catch (error) {
        console.log(error.message);
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, { dispatch }) => {
    try {
        // Assuming the API call for creating a post is implemented in apiCreatePost
        const { data } = await apiCreatePost(postData);
        dispatch(addPost(data));
    } catch (error) {
        console.log(error.message);
    }
});

export const updatedPost = createAsyncThunk('posts/id/updatePost', async ({ id, postData }, { dispatch }) => {
    try {
        console.log("Before API call:", id, postData);

        const { data } = await apiUpdatePost(id, postData);
        console.log("After API call:", data);
        dispatch(update(data));
        
        
    
    } catch (error) {
        console.error("Error:", error.message);
        console.error(error);
        throw error;
    }
});
// Using createPost thunk in a component or wherever you need


export const likedPost = createAsyncThunk('posts/id/likePost', async (postId, { dispatch }) => {
    try {
        console.log("inside the liked post i'm getting id no worries")
        

        await likePost(postId);
        console.log("liked successfully")
        dispatch(like(postId))
        dispatch(resetFlags())
    

    } catch (error) {
        console.error("Error:", error.message);
        console.error(error);
        throw error;
    }
});


export const deleteddPost = createAsyncThunk('posts/id/deletePost', async (postId, { dispatch }) => {
    try {
        console.log('im sending the id inside the deletedPost inside the reducers',postId)

        await deletePost(postId);
        dispatch(deletepost(postId));
        dispatch(resetFlags())
    } catch (error) {

        console.error(error);
        throw error

    }
});