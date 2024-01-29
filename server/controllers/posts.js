import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'
// all the logic of the routers are declared here 

export const getPosts = async (req,res) => {
    
    try{
        const postMessage = await PostMessage.find()
        console.log(postMessage)
        res.status(200).json(postMessage)
        
    }
    catch (error) {
        res.status(404).json({message : error.message})
        // console.log(error.message)
    }
}

export const createPost = async (req, res) => {
    // res.send('Post Creation')
    const post = req.body;
    const newPost = new PostMessage({...post, creator : req.userId, createdAt : new Date().toISOString()});  // Fix: Change 'post' to 'body'
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {  // Fix: Add 'error' as the catch parameter
        res.status(409).json({ message: error.message });
        
    }
};


export const updatePost = async (req,res) => {
    try {
        const {id : _id} = req.params;
        const post = req.body

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")
        
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id},{new : true})
        res.json(updatedPost)
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const deletePost = async (req,res) => {
    try {
        if (!req.userId) return res.json({message : 'Access Denied'})


        console.log("iinside the controllers of backend lo")


        const {id} = req.params



        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")
        await PostMessage.findByIdAndDelete(id);

        res.json({message : 'Post Deleted Successfully'})




    } catch(error){
        console.log(error)
        res.status(500).json({error: 'Something went wrong'})
    }
}


export const likePost = async (req,res) => {
    try {
        if (!req.userId) return res.json({message : 'Access Denied'})

        const  {id}  = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id")
        
        const post = await PostMessage.findById(id);

        console.log("this aboiut lokjslkflk post",post)

        const index  = post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            // like the post
            post.likes.push(req.userId)

        }
        else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId))


        }

        // const likedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
        console.log("kasjfjsfdjksf jlksdfdlkjaslddfjsjlfdlklkjklslkdflk",id)
        const likedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
        res.json(likedPost)

    } catch(error){
        console.log(error.message)
        res.status(500).json({error : 'Something went wrong, please try again later'})
    }
}