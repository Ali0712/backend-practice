const express = require('express');
const moviesController = require('./../controllers/moviesController');

const router = express.Router();

//  Route chaining
router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.addNewMovie)

router.route('/:id')
    .get(moviesController.getMovieByID)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router