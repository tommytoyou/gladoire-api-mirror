const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
});


const Category = mongoose.model('BlogPost', categorySchema);

module.exports = Category
