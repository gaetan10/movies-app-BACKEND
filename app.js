const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

const moviesRoutes = require('./routes/moviesRoutes');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    next(); 
});

app.use('/api/movies', moviesRoutes);

app.listen(4000) 