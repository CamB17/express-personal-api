// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


/************
 * DATABASE *
 ************/

var express = require('express'),
 bodyParser = require('body-parser');

//connect to models db
var db = require('./models');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.get('/', function (req, res) {
   res.sendFile('views/index.html' , { root : __dirname});
 });

// get profile
app.get('api/profile', function(req, res) {
  //profile as JSON res
  db.Profile.find().populate('profile')
  .exec(function(err, profile) {
    if (err) {
      return console.log('index error: ' + err);
    }
  res.json(profile);
  });
});

// get all movies
app.get('/api/movies', function (req, res) {
  // send movies as JSON res
  db.Movie.find()
    .populate('movie')
    .exec(function (err, movies) {
      if (err) { return console.log("index error: " + err); }
      res.json(movies);
    });
});

//create new Movie
app.post('/api/movies', function (req, res) {
  var newMovie = new db.Movie({
    title: req.body.title,
    director: req.body.director,
    realeaseYear: req.body.releaseYear,
  });
  
  //save newMovie to db
  newMovie.save(function(err, movie) {
    if (err) {
      return console.log('save error:' + err);
    }
    console.log('saved ', movie.title);
    //send back to movie
    res.json(movie);
  });
});

//delete movie
app.delete('/api/movies/:id', function (req, res) {
  //get movie id from url params ('req.params')
  console.log('movies delete', req.params);
  var movieId = req.params.id;
  //find movie index to remove
  db.Movie.findOneAndRemove({ _id: movieId }, function (err, deleteMovie) {
    res.json(deletedMovie);
  });
});


/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/CamB17/express_self_api/README.md", // CHANGE ME
    base_url: "http://ancient-sands-52635.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Info about me"},
      {method: "POST", path: "/api/movies", description: "E.g. Add a favorite movie"},
      {method: "GET", path: "/api/movies", description: "Get info about my movies"},
      {method: "DELETE", path: "/api/movies/:movie_id", desciption: "Delete a movie"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
