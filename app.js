// Imports
require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const passport = require('passport')
require('./config/passport')(passport)

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize())


app.get('/api/v0', (req, res) => {
    res.json({ name: 'Gladoire API', greeting: 'Welcome to the the Galdoire Backend API', message: "Smile, you are being watched by the Backend Engineering Team" });
});

app.use('/api/v1/users', routes.user);

// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;
