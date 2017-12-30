var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZoneSchema = new Schema({
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
		'default' : 'par1'
	}
});

ZoneSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

module.exports = mongoose.model('Zone', ZoneSchema);
