const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    SenderId: {
        type: String,
        required: true
    },
    content: {
        type:  String
        },
});

module.exports = mongoose.model('post', postSchema);