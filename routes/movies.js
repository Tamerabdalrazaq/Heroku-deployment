const express = require('express');
const fs = require('fs');
const path = require('path')
const uuid = require('uuid')
const router = express.Router();

const dataPath = path.join(__dirname, '../data/movies.json')

// Get all movies
router.get('/', (req, res) => {
    res.json(getMovies());
})

// Get movie by id
router.get('/:id', (req, res) => {
    const searched = movies.find(movie => movie.id === req.params.id);
    if(!searched) return res.status(400).json({Error: `Cannot find ${req.params.id}`})
    res.json(searched);
})

// Create movie
router.post('/', (req, res) => {
    const newMovie = {id: uuid.v4(), ...req.body};
    let movies = getMovies();
    movies.push(newMovie)
    fs.writeFileSync(dataPath, JSON.stringify(movies));
    res.json(movies);
})

// Update movie by id
router.put('/:id', (req, res) => {
    let movies = getMovies();
    console.log(movies);
    const searched = movies.findIndex(movie => movie.id === req.params.id);
    if(searched < 0) return res.status(400).json({Error: `Cannot find ${req.params.id}`});
    movies[searched] = {...movies[searched], ...req.body};
    fs.writeFileSync(dataPath, JSON.stringify(movies));
    res.json(movies);
})

router.delete('/:id', (req, res) => {
    let movies = getMovies();
    console.log(movies);
    const searched = movies.findIndex(movie => movie.id === req.params.id);
    if(searched < 0) return res.status(400).json({Error: `Cannot find ${req.params.id}`});
    movies.splice(searched, 1);
    fs.writeFileSync(dataPath, JSON.stringify(movies));
    res.json(movies);
})

function getMovies(){
    let movies;
    try{
        movies = fs.readFileSync(dataPath);
        movies = JSON.parse(movies.toString());
    } catch(e){
        movies = [];
        fs.writeFileSync(dataPath, JSON.stringify(movies))
    }
    return movies
}

module.exports = router;