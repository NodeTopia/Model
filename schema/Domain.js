var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DomainSchema = new Schema({
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
	url : {
		type : String,
		required : true
	},
	tls : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'TLS'
	},
    hosts : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Host'
    }
});

var autoPopulateLead = function(next) {
    this.populate('tls');
    this.populate('hosts');
	next()
};

DomainSchema.pre('findOne', autoPopulateLead);
DomainSchema.pre('find', autoPopulateLead);

DomainSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('Domain', DomainSchema);
