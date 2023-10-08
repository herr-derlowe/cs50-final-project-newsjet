const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoutes = require('./api/routes/users')
const articleRoutes = require('./api/routes/articles')
const favoriteRoutes = require('./api/routes/favorites')

app.use(morgan('dev'))
app.use(bodyParser.json())

//Setting up CORS requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// API routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app