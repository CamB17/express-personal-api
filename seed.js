// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

  var db = require('./models');

var camProfile = [
  { name: "Cameron Barclay",
    github_link: "https://github.com/CamB17",
    github_profile_image: 'https://avatars2.githubusercontent.com/u/25963289?v=3&s=460',
    current_city: "Denver",
    favorite_hobbies: [{name: "Mountain Biking"}, {name: "Snowboarding"}, {name: "Lifting Weights"}]
  }

];


var movies_list = [
  {
	 		title: 'The Departed',
	 		director: 'Martin Scorsese',
	 		year: '6 October 2006'

	},
	{
	 		title: 'The Godfather',
	 		director: 'Francis Ford Coppola',
	 		year: ' 24 March 1972'
	},
	{
	 		title: 'Casino',
	 		director: 'Martin Scorsese',
	 		year: '2 November 1995'
	}
];

db.Profile.remove({}, function(err, profile) {
  console.log('remove all profile information');
  db.Profile.create(camProfile, function(err, profile){
    if (err) {
      console.log(err);
      return;
    }
    console.log(profile);
    console.log('recreated profile');
    console.log("created", profile.length, "profile");

  });
});


db.Movie.remove({}, function(err, movies){
    console.log('removed movie');
    db.Movie.create(movies_list, function(err, movies) {
    	if (err) {
    		console.log(err);
    		return;
    	}
    	console.log('recreated all Movies');
    	console.log('created ', movies.length, ' movies');

    });
});