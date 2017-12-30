var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceImageSchema = new Schema({
	image : String,
	registry : String,
	name : String,
	version : Number,
	has_password : Boolean,
	pasword_env : String,
	has_username : Boolean,
	username : String,
	ports : [{
		port : String,
		protocol : String,
		type : String
	}]
});

module.exports = mongoose.model('ServiceImage', ServiceImageSchema);
