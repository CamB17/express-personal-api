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

var express = require('express'),
  bodyParser = require('body-parser');
var db = require('./models');

/**********
 * ROUTES *
 **********/
var app = express();
// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/CamB17/express_self_api/README.md", // CHANGE ME
    base_url: "http://ancient-sands-52635.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Info about me"},
      {method: "POST", path: "/api/cars", description: "E.g. Add a favorite car"},
      {method: "GET", path: "/api/cars", description: "Get info about my cars"}
      {method: "DELETE", path: "/api/cars", desciption: "Delete a car"},
    ]
  });
});

app.get('api/profile', function(req, res) {
  res.json('profile');
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
