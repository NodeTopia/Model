var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var OrganizationSchema = new Schema({
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
	quota : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Quota'
	},
	membership : [{
		user : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'User'
		},
		role : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Role'
		},
		created_at : {
			type : Date,
			'default' : Date.now
		},
		updated_at : {
			type : Date,
			'default' : Date.now
		}
	}],
	apps : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'App'
	}],
	metricSession : {
		type : String,
		'default' : uuid.v4,
		required : true

	},
});

var autoPopulateLead = function(next) {
	this.populate('quota');
	this.populate('apps','-organization');
	this.populate('membership.user','username email info is_active is_staff');
	this.populate('membership.role','created_at updated_at name level');
	next()
};

OrganizationSchema.pre('findOne', autoPopulateLead);
OrganizationSchema.pre('find', autoPopulateLead);

OrganizationSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

module.exports = mongoose.model('Organization', OrganizationSchema);
