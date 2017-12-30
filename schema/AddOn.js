var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddOnSchema = new Schema({
	app : {
		type : Schema.ObjectId
	},
	organization : {
		type : Schema.ObjectId
	},
	is_active : Boolean,
	type : String,
	env : Schema.Types.Mixed,
	containers : [{
		type : Schema.Types.ObjectId,
		ref : 'Container'
	}],
	size : {
		type : Schema.Types.ObjectId,
		ref : 'Size'
	},
	info : Schema.Types.Mixed
});
var autoPopulateLead = function(next) {
	this.populate('containers');
	this.populate('size');
	next();
};

AddOnSchema.pre('findOne', autoPopulateLead);
AddOnSchema.pre('find', autoPopulateLead);

module.exports = mongoose.model('AddOn', AddOnSchema);
