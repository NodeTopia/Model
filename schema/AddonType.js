var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddonTypeSchema = new Schema({
	type : {
		type : String
	}
});

module.exports = mongoose.model('AddonType', AddonTypeSchema);
