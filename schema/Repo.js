var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReopSchema = new Schema({
	user : {
		type : Schema.ObjectId,
		required : true
	},
	app : {
		type : Schema.ObjectId,
		required : true
	},
	name : String,
	organization : String,
	url : String,
	is_active : {
		type : Boolean,
		'default' : true
	},
	created_at : {
		type : Date,
		'default' : Date.now
	},
	updated_at : {
		type : Date,
		'default' : Date.now
	}
});

ReopSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('Reop', ReopSchema);
