var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormationSchema = new Schema({
	commands : [{
		type : {
			type : String,
			required : true
		},
		quantity : {
			type : Number,
			required : true
		},
		size : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Size'
		}
	}],
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
	app : {
		type : Schema.ObjectId,
		index : true
	}
});
FormationSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

var autoPopulateLead = function(next) {
	this.populate('commands.size');
	next()
};

FormationSchema.pre('findOne', autoPopulateLead);
FormationSchema.pre('find', autoPopulateLead);

module.exports = mongoose.model('Formation', FormationSchema);
