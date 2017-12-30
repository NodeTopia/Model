var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ReplSetschema = new Schema({
    name : {
        type : String
    },
    auth : {
        username : {
            type : String
        },
        password : {
            type : String
        }
    },
    logSession : {
        type : String
    },
    metricSession : {
        type : String
    },
    uid : {
        type : String
    },
    size : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Size'
    },
    type : {
        type : String
    },
    info : Schema.Types.Mixed,
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'MongoInstance'
    }]
});
var autoPopulateLead = function(next) {
    this.populate('members');
    this.populate('size');
    next()
};

ReplSetschema.pre('findOne', autoPopulateLead);
ReplSetschema.pre('find', autoPopulateLead);
module.exports = mongoose.model('ReplSetschema', ReplSetschema);
