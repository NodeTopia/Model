var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	"created_at" : {
		type : Date,
		required : true,
		'default' : Date.now
	},
	"type" : {
		type : String
	},
	"actor" : {
		"id" : {
			type : Schema.ObjectId
		},
		"type" : {
			type : String
		}
	},
	"actee" : {
		"source" : {
			type : String
		}
	},
	"metadata" : Schema.Types.Mixed
});

EventSchema.statics.create = function(type, actor, actee, metadata, cb) {

	if (!cb) {
		cb = function() {

		};
	}

	var event = new module.exports({
		type : type,
		actor : actor,
		actee : actee,
		metadata : metadata
	});
	event.save(cb);

};
module.exports = mongoose.model('Events', EventSchema);
