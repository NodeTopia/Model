var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HostSchema = new Schema({
    created_at: {
        type: Date,
        required: true,
        'default': Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        'default': Date.now
    },
    ip: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        'default': 'system'
    },
    active: {
        type: Boolean,
        required: true,
        'default': true
    }
});

HostSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
module.exports = mongoose.model('Host_', HostSchema);
