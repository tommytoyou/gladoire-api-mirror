const mongoose = require('mongoose');
const { Schema } = mongoose;

const journalSchema = new Schema({
    date: {type: Date, default: Date.now()},
    duration: {type: Number, required: true, default: 0},
    bg_music: {type: String},
    moon_phase: {type: String},
    notes: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    mood_pre: {type: Number, required: true},
    mood_post: {type: Number, required: true},
    energy_pre: {type: Number, required: true},
    energy_post: {type: Number, required: true},
    tags: [String],
    user_fields: [{}],
    location: {type: String}
})

const Journal = mongoose.model('User', journalSchema);

module.exports = Journal