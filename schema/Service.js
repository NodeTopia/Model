var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	appId : {
		type : Schema.ObjectId
	},
	serviceId : {
		type : Schema.ObjectId
	},
	name : String,
	username : String,
	password : String,
	host : String,
	port : Number
});

module.exports = mongoose.model('Service', ServiceSchema);
