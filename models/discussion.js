const mongoose = require('mongoose')

// embedded example
// commentSchema with header, content, date
const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, required: true},
    date: Date
});

// blogPostSchema with title, body, and comments Array of commentSchema
const discussionSchema = new mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    comments: [commentSchema]
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion

