var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanSchema = new Schema({
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
		'default' : 'basic',
		required : true
	},
	apps : {
		type : Number,
		required : true
	},
	processes : {
		type : Number,
		required : true
	},
	cpu : {
		type : Number,
		required : true
	},
	memory : {
		type : Number,
		required : true
	},
	services : {
		type : Number,
		required : true
	},
	dedicated : {
		type : Boolean,
		required : true
	},
	size : {
		type : Schema.Types.ObjectId,
		ref : 'Size'
	}
});

var autoPopulateLead = function(next) {
	
	this.populate('size');
	next()
};

PlanSchema.pre('findOne', autoPopulateLead);
PlanSchema.pre('find', autoPopulateLead);

PlanSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

module.exports = mongoose.model('Plan', PlanSchema);
