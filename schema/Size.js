var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SizeSchema = new Schema({
	type : {
		type : String,
		required : true
	},
	system : {
		type : Boolean,
		required : true,
		'default' : false
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
	memory : {
		type : Number,
		required : true
	},
	cpuset : {
		type : Number,
		required : true
	},
	cpuShares : {
		type : Number,
		required : true
	},
	memoryReservation : {
		type : Number,
		required : true
	},
	ioMaximumBandwidth : {
		type : Number,
		required : true
	},
	ioMaximumIOps : {
		type : Number,
		required : true
	},
	oomKillDisable : {
		type : Boolean,
		required : true
	},
	dedicated : {
		type : Boolean,
		required : true,
		'default' : false
	}
});

SizeSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('Size', SizeSchema);