var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProfileSchema = new Schema ({
	name: "Cameron",
	github_link: " ",
	github_profile_image: " ",
	current_city: "Denver"
});

var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;