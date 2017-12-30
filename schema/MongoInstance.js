var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MongoInstanceschema = new Schema({
    name : String,
    env : Schema.Types.Mixed,
    host : String,
    port : Number,
    logSession : {
        type : String
    },
    metricSession : {
        type : String
    },
    location : {
        environment : {
            type : String
        },
        region : {
            type : String
        }
    },
    uid : {
        type : String
    },
    container:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Container'
    },
    hostname : String,
    info : Schema.Types.Mixed
});
var autoPopulateLead = function(next) {
    this.populate('container');
    next()
};

MongoInstanceschema.pre('findOne', autoPopulateLead);
MongoInstanceschema.pre('find', autoPopulateLead);

module.exports = mongoose.model('MongoInstance', MongoInstanceschema);
