const express = require('express');
const bodyParser = require('body-parser');
const uuid =require('uuid');

const morgan = require('morgan');
    fs = require('fs'), // import built in node modules fs and path 
    path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require('mongoose');
const Models = require ('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true});

let topMovies = [
    {
      movieId: 1,
      title: '21 JUMP STREET',
      starring: 'Jonah Hill, Channing Tatum, Brie Larson, Dave Franco',
      director:  'Phil Lord, Chris Miller',
      year: 2012,
      genre: "comedy"
    },
    {
      movieId: 2, 
      title: 'ALL ABOUT MY MOTHER',
      starring: 'Cecilia Roth, Eloy Azorín, Marisa Paredes, Penélope Cruz',
      director: 'Pedro Almodóvar',
      year: 1999,
      genre: "comedy"
    },
    {
      movieId: 3, 
      title: 'AMERICAN PIE',
      starring: 'Jason Biggs, Shannon Elizabeth, Alyson Hannigan, Chris Klein',
      director: 'Paul Weitz',
      year: 1999,
      genre: "comedy"
    },
    {
      movieId: 4, 
    title: 'ANNIE HALL',
    starring: 'Woody Allen, Diane Keaton, Tony Roberts, Carol Kane',
    director: 'Woody Allen',
    year: 1977,
    genre: "comedy"
    },
    {
      movieId: 5, 
    title: 'THE APARTMENT',
    starring: 'Jack Lemmon, Shirley MacLaine, Fred MacMurray, Ray Walston',
    director: 'Billy Wilder',
    year: 1960,
    genre: "comedy"
    },
    {
      movieId: 6, 
    title: 'BARBERSHOP',
    starring: 'Ice Cube, Anthony Anderson, Cedric the Entertainer, Sean Patrick Thomas',
    director: 'Tim Story',
    year: 2002,
    genre: "comedy"
    },
    {
      movieId: 7, 
    title: 'BEING THERE',
    starring: 'Peter Sellers, Shirley MacLaine, Jack Warden, Melvyn Douglas',
    director: 'Hal Ashby',
    year: 1979,
    genre: "comedy"
    },
    {
      movieId: 8, 
    title: 'BEST IN SHOW',
    starring: "Michael Hitchcock, Parker Posey, Eugene Levy, Catherine O'Hara",
    director: 'Christopher Guest',
    year: 2000,
    genre: "comedy"
    },
    {
      movieId: 9, 
    title: 'BIG',
    starring: 'Tom Hanks, Elizabeth Perkins, Robert Loggia, John Heard',
    director: 'Penny Marshall',
    year: 1988,
    genre: "comedy"
    },
    {
      movieId: 10, 
    title: 'BOOKSMART',
    starring: 'Kaitlyn Dever, Beanie Feldstein, Jessica Williams, Jason Sudeikis',
    director: 'Olivia Wilde',
    year: 2019,
    genre: "comedy"
    }
  ];

  // GET requests
    app.get('/', (req, res) => {
    res.send('Welcome to myFlix club!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  app.get('/movies/genre/:genreId', (req, res) => {
   res.json(topMovies.filter( (topMovies) =>
    { return topMovies.genre === req.params.genreId }));
  });

 app.get('/movies/title/:titleId', (req, res) => {
    res.json(topMovies.find( (topMovie) =>
      { return topMovie.title === req.params.titleId }));
  });

// Adds data for a new movie to our list of movies.
app.post('/movies', (req, res) => {
  let newMovie = req.body;
//console.log(newMovie);
  if (!newMovie.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    // newMovie.id = uuid.v4();
    const newMovieWithId = {id: uuid.v4(), ...newMovie};
    topMovies.push(newMovieWithId);
    res.status(201).send(newMovieWithId);
  }
});

// Deletes a movie from the list by Title
/* app.delete('/movies/:movieId', (req, res) => {
  let movie = topMovies.find((movie) => { return movie.movieId === req.params.movieId });

  if (movie) {
    topMovies = topMovies.filter((obj) => { return obj.movieId !== req.params.movieId });
    res.status(201).send('Movie ' + movie.title + ' was deleted.');
  }
}); */

app.delete('/movies/:movieId', (req, res) => {
  let movieToDelete = topMovies.find(movie => movie.movieId == req.params.movieId);
  //console.log(req.params.movieId, movieToDelete);
    if (movieToDelete) {
    topMovies = topMovies.filter(obj => obj.movieId !== req.params.movieId);
    res.status(201).send('Movie ' + movieToDelete.title + ' was deleted.');
  } else {
    res.status(404).send('Movie not found.');
  }
});

/* app.put('/movies/:movieId', (req, res) => {
  let movie = topMovies.find((movie) => { return movie.movieId == req.params.movieId });

  if (movie) {
    movie.req.params[req.params.body] = parseInt(req.params.body);
    res.status(201).send('Movie ' + movie.req.params + ' was changed ' + req.params.body);
  } else {
    res.status(404).send('Movie with title ' + req.params.title + ' was not found.');
  }
}); */

app.put('/movies/:movieId', (req, res) => {
const movieId = req.params.movieId;
const updatedMovieDetails = req.body;

// Find the index of the movie to be updated
const movieIndex = topMovies.findIndex(movie => movie.movieId == movieId);
//console.log(req.params.movieId, updatedMovieDetails)
if (movieIndex !== -1) {
// Update the movie details
topMovies[movieIndex] = { ...topMovies[movieIndex], ...updatedMovieDetails };
res.status(200).send('Movie with ID ' + movieId + ' was updated.');
} else {
res.status(404).send('Movie with ID ' + movieId + ' not found.');
}
});
  
  app.use('/documentation.html', express.static('public'));
  
  // create a write stream (in append mode)
  // a ‘log.txt’ file is created in root directory
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

  // setup the logger
  app.use(morgan('combined', {stream: accessLogStream}));
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
  
  