var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var uuid = require('node-uuid');

var AppSchema = new Schema({
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
	},
	name : {
		type : String,
		required : true
	},
	organization : {
		type : Schema.Types.ObjectId,
		ref : 'Organization'
	},
	logSession : {
		type : String,
		'default' : uuid.v4,
		required : true
	},
	metricSession : {
		type : String,
		'default' : uuid.v4,
		required : true
	},
	maintenance : {
		type : Boolean,
		required : true,
		'default' : false
	},
	url : {
		type : String,
		required : true
	},
	size : {
		type : Schema.Types.ObjectId,
		ref : 'Size'
	},
	domains : [{
		type : Schema.Types.ObjectId,
		ref : 'Domain'
	}]
});
AppSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

var autoPopulateLead = function(next) {
	this.populate('domains');
	this.populate('organization', 'created_at updated_at name quota membership metricSession');
	this.populate('size', 'type created_at updated_at memory cpuset cpuShares memoryReservation ioMaximumBandwidth ioMaximumIOps oomKillDisable');
	next();
};

AppSchema.pre('findOne', autoPopulateLead);
AppSchema.pre('find', autoPopulateLead);

module.exports = mongoose.model('App', AppSchema);
