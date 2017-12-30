var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddOnContainerSchema = new Schema({
	"created_at" : {
		type : Date,
		required : true,
		'default' : Date.now
	},
	"updated_at" : {
		type : Date,
		'default' : Date.now
	},
	"stopped_at" : {
		type : Date
	},
	"userId" : {
		type : Schema.ObjectId,
		index : true
	},
	"appId" : {
		type : Schema.ObjectId,
		index : true
	},
	"nodeId" : {
		type : Schema.ObjectId,
		index : true
	},
	"id" : {
		type : String,
		index : true
	},
	"index" : {
		type : Number,
		index : true
	},
	"state" : {
		type : String,
		index : true
	},
	"type" : {
		type : String,
		index : true
	},
	"name" : {
		type : String,
		index : true
	},
	"uid" : {
		type : String,
		index : true
	},
	"ports" : [{
		forward : String,
		port : Number,
		ip : String
	}],
	"env" : {

	},
	"image" : {
		type : String,
		index : true
	},
	"logSession" : {
		type : String,
		index : true
	},
	"location" : {
		type : String,
		index : true
	},
	"logs" : {
		web : {
			host : String,
			port : Number
		},
		udp : {
			host : String,
			port : Number
		}
	},
	"config" : Schema.Types.Mixed
});

AddOnContainerSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('AddOnContainer', AddOnContainerSchema);
//module.exports.remove(function(){})
