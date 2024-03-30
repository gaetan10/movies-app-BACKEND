const express = require('express');

const router = express.Router(); 

const moviesController = require('../controllers/moviesController');
  


// GET /api/movies/ (to get all movies)
router.get('/', moviesController.getMovies);

// GET /api/movies/:movieId (to get info about a specific movie)
router.get('/:movieId', moviesController.getMovieById);

// POST /api/movies/new (to add a new movie)
router.post('/new', moviesController.addMovie);

// PUT /api/movies/:movieId (to edit an existing movie)
router.put('/:movieId', moviesController.editMovie);

// DELETE /api/movies/:movieId (to delete an existing movie)
router.delete('/:movieId', moviesController.deleteMovie);


module.exports = router;