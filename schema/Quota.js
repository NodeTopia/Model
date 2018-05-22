var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuotaSchema = new Schema({
	userId : {
		type : Schema.ObjectId,
		index : true
	},
	created_at : {
		type : Date,
		'default' : Date.now
	},
	updated_at : {
		type : Date,
		'default' : Date.now
	},
	apps : {
		type : Number,
		'default' : 0
	},
	processes : {
		type : Number,
		'default' : 0
	},
    memory : {
        type : Number,
        'default' : 0
    },
    cpu : {
        type : Number,
        'default' : 0
    },
	services : {
		type : Number,
		'default' : 0
	},
	plan : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Plan'
	},
	zones : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Zone'
	}]
});

var autoPopulateLead = function(next) {
	this.populate('zones','name created_at updated_at');
	this.populate('plan', 'created_at updated_at name apps processes cpu memory services dedicated size');
	next()
};

QuotaSchema.pre('findOne', autoPopulateLead);
QuotaSchema.pre('find', autoPopulateLead);

QuotaSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

module.exports = mongoose.model('Quota', QuotaSchema);
