var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TLSschema = new Schema({
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
	staging : {
		type : Boolean,
		'default' : false
	},
	cert : {
		type : String,
		required : true
	},
	privkey : {
		type : String,
		required : true
	},
	chain : {
		type : String,
		required : true
	},
	subject : {
		type : String,
		required : true
	},
	issuedAt : {
		type : Date,
		required : true
	},
	expiresAt : {
		type : Date,
		required : true
	},
});

TLSschema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});
module.exports = mongoose.model('TLS', TLSschema);
