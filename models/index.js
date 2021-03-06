require('dotenv').config();
const mongoose = require('mongoose');

// const { MONGO_URL } = process.env;
const MONGO_URL = process.env.MONGO_URL
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose.connect(MONGO_URL, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = {
    Journal: require('./journal'),
    User: require('./user'),
    Category: require('./category'),
    Discussion: require('./discussion'),
    Messaging: require('./conversation')
};
