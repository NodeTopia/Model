var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tarSchema = new Schema({
	app : {
		type : Schema.ObjectId,
		index : true
	},
	size : {
		type : Number
	},
	etag : {
		type : String
	},
	contentType : {
		type : String
	},
	lastModified : {
		type : Date
	},
	path : {
		type : String
	}
});

module.exports = mongoose.model('BuildTar', tarSchema);
