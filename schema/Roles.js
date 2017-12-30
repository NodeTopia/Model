var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
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
	name : {
		type : String,
		required : true
	},
	level : {
		type : Number,
		required : true
	}
});

RoleSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('Role', RoleSchema);
