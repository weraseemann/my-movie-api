const express = require('express');
const bodyParser = require('body-parser');
const uuid =require('uuid');

const morgan = require('morgan');
    fs = require('fs'), // import built in node modules fs and path 
    path = require('path');
const app = express();

//Recuire necessary modules
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/cfDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});
// Logging midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("common"));

let auth = require('./auth')(app);//the app argument ensures that Express is available in your “auth.js” file as well
const passport = require('passport');
require('./passport');

  // default test response when at /
    app.get('/', (req, res) => {
    res.send('Welcome to myFlix club!');
  });
  
app.get('/documentation', passport.authenticate('jwt', { session: false }), (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

  
  //return JSON object when at movies
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

  //GET JSON genre info when looking for specific genre
  app.get('/genre/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
   await Genres.findOne({name: req.params.Name})
   .then((genre) => {
    if(genre === null) {
     res.status(404).send('Not found');
    } else {
      res.json(genre.description);
    }
   })
   .catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err);
   })
  });

  //GET JSON movie info when looking for specific title
 app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({title:req.params.Title})
  .then((movie) => {
    res.json(movie);
 })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
  });

//GET JSON movies when looking for specific genre
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.params)
  await Movies.find({"genre.name": req.params.Name})
.then((movie) => {
  res.json(movie);
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error:' + err);
});
});

  //GET JSON director from the directorsDB
 app.get('/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  return Directors.findOne({name:req.params.Name})
  .then((director) => {
    res.json(director);
 })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
  });
  //GET JSON director from the moviesDB
  app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    return Movies.find({'director.name':req.params.Name})
    .then((director) => {
      res.json(director);
   })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
    });

//Add new user
app.post('/users', async (req, res) => {
  await Users.findOne({Username: req.body.Username})
  .then((user) =>{
    if (user){
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      return Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) =>{res.status(201).json(user) })
      .catch((error) =>{
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

//Get all the users
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

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req,res) => {
  await Users.findOne({Username: req.params.Username})
  .then((user) => {
    res.json (user);
    })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});
// Update a user's info, by username
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, 
  { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // To make sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
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

// Delete a movie from a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
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

// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
  
  