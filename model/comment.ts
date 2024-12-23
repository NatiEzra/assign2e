import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
    },
    content: {
        type:  String
        },
    username: {
        type: String,
    },
});
const commentModel = mongoose.model('comment', commentSchema);
export default commentModel;