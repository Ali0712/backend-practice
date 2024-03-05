const fs = require('fs')

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// get all movies
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: 'success',
        count: movies.length,
        data: { movies: movies }
    })
}

// get movie by id
exports.getMovieByID = (req, res) => {
    const id = +req.params.id;
    const movie = movies.find(data => data.id === id);
    if (!movie) {
        return res.status(404).json({
            status: 'fail',
            message: `movie with id = ${id} not found`
        })
    }
    res.status(200).json({
        status: 'success',
        data: { movie: movie }
    })
}

// add new movie
exports.addNewMovie = (req, res) => {
    const newID = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ 'id': newID }, req.body)
    movies.push(newMovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: { movie: newMovie }
        })
    })
}

// update a movie
exports.updateMovie = (req, res) => {
    const id = +req.params.id;
    let movieToUpdate = movies.find(data => data.id === id);
    if (!movieToUpdate) {
        return res.status(404).json({
            status: 'fail',
            message: `movie with id = ${id} not found`
        })
    }
    Object.assign(movieToUpdate, req.body);
    const index = movies.indexOf(movieToUpdate);
    movies[index] = movieToUpdate;
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: 'success',
            data: { movie: movieToUpdate }
        })
    })
}

// delete a movie
exports.deleteMovie = (req, res) => {
    const id = +req.params.id;
    const movieToDelete = movies.find(data => data.id === id);
    if (!movieToDelete){
        return res.status(404).json({
            status : 'fail', 
            message : `movie with id = ${id} not found` 
        })
    }
    
    const index = movies.indexOf(movieToDelete);
    movies.splice(index, 1);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(204).json({
            status : 'success',
            data : { movie : null }
        })
    })
}
