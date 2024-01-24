import axios from 'axios';

const API = axios.create({baseURL : 'http://localhost:5000'})

// working with auth middle ware 

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization =  `Bearer ${JSON.parse(localStorage.getItem('profile')).jti}`
    }
    return req
})

// const url = 'http://localhost:5000/posts';


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts',newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)


export const signInApi = (formData) => API.post('/user/signin',formData)

export const signUpAPi = (formData) => API.post('/user/signup',formData)