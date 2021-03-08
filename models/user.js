const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    full_name: {type: String},
    display_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 8},
    salt: {type: String},
    custom_fields: [String],
    location: {type: String},
    user_level: {type: Number, required: true, default: 0},
    is_active: {type: Number, required: true, default: 0},
    is_hidden: {type: Number, required: true, default: 0},
    bg_urls: [String],
    connected_users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    date_joined: {type: Date, default: Date.now()}
})

const User = mongoose.model('User', userSchema);

module.exports = User