const express = require('express')
const movieRouter = require('./routes/movieRoutes');

const app = express()

app.use(express.json())

// Middleware
// const logger = (req, res, next) => {
//     console.log('This is middleware')
//     next()
// }
// app.use(logger)

//  Using Routes
app.use('/api/v1/movies', movieRouter)

module.exports = app;