var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var PetsSchema = new Schema({
		name: String,
		type: String,
		breed: String
	});

	var Pets = mongoose.model('Pets', PetsSchema);
	module.exports = Pets;