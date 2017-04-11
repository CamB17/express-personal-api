var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProfileSchema = new Schema ({
	name: String
	github_link: "https://github.com/CamB17"
	github_profile_image: "https://github.com/settings/profile"
	current_city: String
});

var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;