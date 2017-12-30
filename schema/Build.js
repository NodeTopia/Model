var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BuildSchema = new Schema({
	organization : {
		type : Schema.ObjectId,
		index : true
	},
	app : {
		type : Schema.ObjectId,
		index : true
	},
	commit : {
		type : Schema.ObjectId,
		index : true
	},
	container : {
		type : Schema.ObjectId,
		index : true
	},
	is_active : {
		type : Boolean,
		'default' : true
	},
	failed : {
		type : Boolean,
		'default' : true
	},
	process : Number,
	name : String,
	build : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'BuildTar'
	},
	application : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'BuildTar'
	},
	cache : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'BuildTar'
	},
	version : Number,
	procfile : [{
		process : String,
		command : String,
		options : [String]
	}],
	created_at : {
		type : Date,
		'default' : Date.now
	}
});

var autoPopulateLead = function(next) {
	this.populate('build');
	this.populate('application');
	this.populate('cache');
	next();
};

BuildSchema.pre('findOne', autoPopulateLead);
BuildSchema.pre('find', autoPopulateLead);
module.exports = mongoose.model('Build', BuildSchema);
