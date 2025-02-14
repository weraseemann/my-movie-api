const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const morgan = require('morgan');
fs = require('fs'), // import built in node modules fs and path 
  path = require('path');
const app = express();

/**Recuire necessary modules
 * @mongoose
 * @Models
*/
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const { check, validationResult } = require('express-validator');


mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


/**Logging midleware */ 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));

/** Use CORS Cross-Origin-Resorce Sharing
 * and allow origins
*/
const cors = require('cors');
app.use(cors());
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://mynightflix.netlify.app', 'https://weraseemann.github.io', 'http://localhost:4200'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

/** Use Auth.js*/
let auth = require('./auth')(app);//the app argument ensures that Express is available in your “auth.js” file as well
const passport = require('passport');
require('./passport');


/** Default test response when at / */
app.get('/', (req, res) => {
  res.send('Welcome to myFlix club!');
});

app.get('/documentation', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});


/** return JSON object when at movies */
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** GET JSON genre info when looking for specific genre*/
app.get('/genre/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Genres.findOne({ name: req.params.Name })
    .then((genre) => {
      if (genre === null) {
        res.status(404).send('Not found');
      } else {
        res.json(genre.description);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

/**GET JSON movie info when looking for specific title */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});

/** GET JSON movies when looking for specific genre */
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.params)
  await Movies.find({ "genre.name": req.params.Name })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});

/** GET JSON director from the directorsDB */
app.get('/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  return Directors.findOne({ name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});
/** GET JSON director from the moviesDB */
app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  return Movies.find({ 'director.name': req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});

/** Add new user*/
app.post('/users', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
],
  async (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          return Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error:' + error);
            })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error:' + error);
      });
  });

/** Get all the users */
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});
/** Update a user's info, by username */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.params.Username !== req.user.Username) {
    return res.status(403).send('You are not authorized to make changes to this user.');
  }
  await Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set:
      {
        Username: req.body.Username,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }) // To make sure that the updated document is returned
    // Prevent the 'password' field from returning.
    .select('-Password')
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })

});

/**  Add a movie to a user's list of favorites */
app.post('/users/:Username/movies/favourites/:MovieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.params.Username !== req.user.Username) {
    return res.status(403).send('You are not authorized to make changes to this user.');
  }
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavouriteMovies: req.params.MovieId }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** Delete a movie from a user's list of favorites */ 
app.delete('/users/:Username/movies/favourites/:MovieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.params.Username !== req.user.Username) {
    return res.status(403).send('You are not authorized to make changes to this user.');
  }
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavouriteMovies: req.params.MovieId }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**  Delete a user by username*/
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.params.Username !== req.user.Username) {
    return res.status(403).send('You are not authorized to delete this user.');
  }
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use('/documentation.html', express.static('public'));

/**  create a write stream (in append mode)
 *  a ‘log.txt’ file is created in root directory*/
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port' + port);
});