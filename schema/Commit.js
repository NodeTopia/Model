var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommitSchema = new Schema({
	user : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User'
	},
	repo : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Repo'
	},
	organization : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Organization'
	},
	name : String,
	action : String,
	commit : String,
	branch : String,
	tar : String,
	created_at : {
		type : Date,
		'default' : Date.now
	}
});

module.exports = mongoose.model('Commit', CommitSchema);
