var mongoose = require('mongoose'), Schema = mongoose.Schema;

var Shardschema = new Schema({
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
    uid : {
        type : String
    },
    logSession : {
        type : String
    },
    metricSession : {
        type : String
    },
    zones : [{
       type : mongoose.Schema.Types.ObjectId,
        ref : 'Zone'
    }],
    size : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Size'
    },
    type : {
        type : String
    },
    info : Schema.Types.Mixed,
    replicaSets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ReplSetschema'
    }],
    configs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ReplSetschema'
    }],
    mongos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'MongoInstance'
    }]
});

var autoPopulateLead = function(next) {
    this.populate('replicaSets');
    this.populate('configs');
    this.populate('mongos');
    next();
};

Shardschema.pre('findOne', autoPopulateLead);
Shardschema.pre('find', autoPopulateLead);
module.exports = mongoose.model('Shardschema', Shardschema);
