var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnvSchema = new Schema({
	app : {
		type : Schema.ObjectId,
		required : true
	},
	created_at : {
		type : Date,
		required : true,
		'default' : Date.now
	},
	updated_at : {
		type : Date,
		required : true,
		'default' : Date.now
	},
	env : Schema.Types.Mixed
});

EnvSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('Env', EnvSchema); 