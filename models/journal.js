const mongoose = require('mongoose');
const { Schema } = mongoose;

const journalSchema = new Schema({
    date: {type: Date, default: Date.now()},
    duration: {type: Number, required: false, default: 0},
    bg_music: {type: String},
    moon_phase: {type: String},
    notes: {type: String, required: false},
    user: {type: mongoose.ObjectId, ref: 'User'},
    mood_pre: {type: Number, required: false},
    mood_post: {type: Number, required: false},
    energy_pre: {type: Number, required: false},
    energy_post: {type: Number, required: false},
    tags: [String],
    user_fields: [{}],
    location: {type: String}
})

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal