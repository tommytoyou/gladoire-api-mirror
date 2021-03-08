const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    full_name: {type: String},  //user's full name, optional
    display_name: {type: String, required: true},  //nickname
    email: {type: String, required: true},  // email, just like on the tin
    password: {type: String, required: true, minLength: 8},
    salt: {type: String},   //this will be for encryption of journals if we implement it
    custom_fields: [String],  //stores an array of string values that represent the user's custom journal fields
    location: {type: String}, // optional, where is the user on the planet?
    user_level: {type: Number, required: true, default: 0}, //access level, determines permissions and admin access
    is_active: {type: Number, required: true, default: 0}, //user is currently in meditation session, this is how connections can start
    is_hidden: {type: Number, required: true, default: 0}, //user does not want to show up as active
    bg_urls: [String], //youtube URLs for background music
    connected_users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //friends list
    date_joined: {type: Date, default: Date.now()}  //generated automatically on registration, date of joining
})

const User = mongoose.model('User', userSchema);

module.exports = User