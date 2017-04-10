var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProfileSchema = new Schema ({
	name: "Cameron",
	github_link: " ",
	github_profile_image: " ",
	current_city: "Denver",
	pets: [
		{
		name: "Nixon",
		type: "dog",
		breed: "Ridgeback-Lab"
		}
	];
});

module.exports = Profile;