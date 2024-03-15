const express = require('express');
const morgan = require('morgan');
    fs = require('fs'), // import built in node modules fs and path 
  path = require('path');
const app = express();

let topMovies = [
    {
      title: '21 JUMP STREET',
      starring: 'Jonah Hill, Channing Tatum, Brie Larson, Dave Franco',
      director:  'Phil Lord, Chris Miller',
      year: 2012,
      genre: "comedy"
    },
    {
      title: 'ALL ABOUT MY MOTHER',
      starring: 'Cecilia Roth, Eloy Azorín, Marisa Paredes, Penélope Cruz',
      director: 'Pedro Almodóvar',
      year: 1999,
      genre: "comedy"
    },
    {
      title: 'AMERICAN PIE',
      starring: 'Jason Biggs, Shannon Elizabeth, Alyson Hannigan, Chris Klein',
      director: 'Paul Weitz',
      year: 1999,
      genre: "comedy"
    },
    {
    title: 'ANNIE HALL',
    starring: 'Woody Allen, Diane Keaton, Tony Roberts, Carol Kane',
    director: 'Woody Allen',
    year: 1977,
    genre: "comedy"
  
    },
    {
    title: 'THE APARTMENT',
    starring: 'Jack Lemmon, Shirley MacLaine, Fred MacMurray, Ray Walston',
    director: 'Billy Wilder',
    year: 1960,
    genre: "comedy"
    },
    {
    title: 'BARBERSHOP',
    starring: 'Ice Cube, Anthony Anderson, Cedric the Entertainer, Sean Patrick Thomas',
    director: 'Tim Story',
    year: 2002,
    genre: "comedy"
    },
    {
    title: 'BEING THERE',
    starring: 'Peter Sellers, Shirley MacLaine, Jack Warden, Melvyn Douglas',
    director: 'Hal Ashby',
    year: 1979,
    genre: "comedy"
    },
    {
    title: 'BEST IN SHOW',
    starring: "Michael Hitchcock, Parker Posey, Eugene Levy, Catherine O'Hara",
    director: 'Christopher Guest',
    year: 2000,
    genre: "comedy"
    },
    {
    title: 'BIG',
    starring: 'Tom Hanks, Elizabeth Perkins, Robert Loggia, John Heard',
    director: 'Penny Marshall',
    year: 1988,
    genre: "comedy"
    },
    {
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
  
  