var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScalewayTypeSchema = new Schema({
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
	price : {
		type : Number
	},
	zone : {
		type : String
	},
	memory : {
		type : Number
	},
	cpu : {
		type : Number
	},
	disks : [{
		size : {
			type : Number
		},
		path : {
			type : String
		}
	}]
});

ScalewayTypeSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('ScalewayType', ScalewayTypeSchema);
