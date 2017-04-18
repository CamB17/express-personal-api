// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/


//connect to models db
var db = require('./models');

/**********
 * ROUTES *
 **********/

app.use(express.static('public'));

//profile variable

var camProfile = [
  { name: "Cameron Barclay",
    github_link: "https://github.com/CamB17",
    github_profile_image: 'https://avatars2.githubusercontent.com/u/25963289?v=3&s=460',
    current_city: "Denver",
    favorite_hobbies: [{name: "Mountain Biking"}, {name: "Snowboarding"}, {name: "Lifting Weights"}]
  }

];

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
    woops_i_has_forgot_to_document_all_my_endpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/CamB17/express_self_api/README.md", // CHANGE ME
    base_url: "http://ancient-sands-52635.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", type: "array", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", type: "array", description: "Info about me"},
      {method: "POST", path: "/api/movies", type: "array", description: "E.g. Add a favorite movie"},
      {method: "GET", path: "/api/movies", type: "array", description: "Get info about my movies"},
      {method: "DELETE", path: "/api/movies/:id", type: "array", desciption: "Delete a movie"}
    ]
  });
});

////////////////////
//  ROUTES
///////////////////

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get profile
app.get('/api/profile', function(req, res) {
  console.log('My profile!');
  res.json(camProfile);
});

// get all movies
app.get('/api/movies', function (req, res) {
  // send movies as JSON res
  console.log("Movies page!");
  db.Movie.find()
    .exec(function (err, movies) {
      if (err) { return console.log("index error: " + err); }
      res.json(movies);
    });
});

// get one movie
app.get('/api/movies/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.params.id);
 db.Movie.findOne({_id: id}, function(err, movie) {
  if(err) {
    console.log(err);
  } else {
    res.json(movie); 
  }
  });
});

//create new Movie
app.post('/api/movies', function (req, res) {
  var newMovie = new db.Movie({
    title: req.body.title,
    director: req.body.director,
    realeaseYear: req.body.year,
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

// UPDATE
app.put('/api/movies/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.params.id);

  db.Movie.findOne({_id: id}, function(err, movie) {
    if(err) res.json({message: 'Could not find movie because: ' + err});

    if(req.body.name) movie.name = req.body.title;
    console.log(movie.title);
    if(req.body.director) movie.director = req.body.director;
    console.log(movie.location);
    if(req.body.year) movie.year = req.body.year;
    console.log(movie.releaseYear);
    
    movie.save();
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



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
