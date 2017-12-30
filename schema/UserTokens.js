var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserTokens;

var UserTokensSchema = new Schema({
	userId : {
		type : Schema.ObjectId,
		index : true
	},
	token : {
		type : String,
		index : true
	},
	createdAt : {
		type : Date,
		//expires : 3600,
		'default' : Date.now
	}
});

UserTokensSchema.statics.new = function(userId, cb) {

	module.exports.findOne({
		userId : userId
	}, function(err, user) {
		if (err)
			return cb(err)

		if (!user) {
			var user = new module.exports();
			crypto.randomBytes(48, function(ex, buf) {
				var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');

				user.token = userId + '|' + token.toString().slice(1, 24);
				user.userId = userId;
				user.save(cb);
			});
		} else {
			cb(null, user);
		}

	});
};

module.exports = mongoose.model('UserTokens', UserTokensSchema);
