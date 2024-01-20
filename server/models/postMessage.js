import mongoose from "mongoose";

const postScheme = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likes : {
        type : [String],
        default : 0
    },
    createAt : {
        type : Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage',postScheme)

export default PostMessage