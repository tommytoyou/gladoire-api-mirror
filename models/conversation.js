const mongoose = require('mongoose')

// embedded example
// commentSchema with header, content, date
const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    subject: {type: String},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

// blogPostSchema with title, body, and comments Array of commentSchema
const messagingSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [messageSchema]
});

const Messaging = mongoose.model('BlogPost', messagingSchema);

module.exports = Messaging

