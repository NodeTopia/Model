var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
	first_name : String,
	last_name : String,
	created_at : {
		type : Date,
		'default' : Date.now
	},
	updated_at : {
		type : Date,
		'default' : Date.now
	},
});

UserInfoSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

module.exports = mongoose.model('UserInfo', UserInfoSchema); 