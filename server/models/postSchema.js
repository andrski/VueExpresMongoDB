const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    _id:{
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: false,
    },
    published: {
        type: Date,
    },
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post