// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

  var db = require('./models');

  var personal_info = [
  	{
  		name: 'Cameron Barclay',
  		github_link: 'https://github.com/CamB17',
  		github_profile_image: 'https://avatars2.githubusercontent.com/u/25963289?v=3&s=460',
  		current_city: 'Denver'
  		//favorite_movies: ['The Departed', 'The Godfather', 'Casino']
  		//pets:
  	}];

var mongoose = require('mongoose'),
	// var movies_list = [
	// 	{

	// 	}]

db.Profile.remove({}, function(err, profile) {
	console.log('remove all profile information');
	db.Profile.create(personal_info, function(err, profile) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(profile);
		console.log('recreated profile');
		console.log("created", profile.length, "profile");
	});
});


