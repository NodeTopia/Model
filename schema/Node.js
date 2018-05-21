var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodeSchema = new Schema({
    dockerId: {
        type: String
    },
    socketId: {
        type: String
    },
    address: {
        type: String
    },
    region: {
        type: String
    },
    region: {
        type: String
    },
    region: {
        type: String
    },
    environment: {
        type: String
    },
    name: {
        type: String
    },
    id: {
        type: String
    },
    url: {
        type: String
    },
    zone: {
        type: String
    },
    multitenant: {
        type: Boolean
    },
    memory: {
        used: Number,
        total: Number,
        reserved: Number,
        avalibale: Number
    },
    cores: {
        count: Number,
        used: [Number],
        avalibale: Number
    },
    is_active: {
        type: Boolean,
        'default': false
    },
    created_at: {
        type: Date,
        'default': Date.now
    },
    updated_at: {
        type: Date,
        'default': Date.now
    },
    last_used: {
        type: Date,
        'default': Date.now
    },
    closing: {
        type: Boolean,
        'default': false
    },
    reserved: {
        type: Boolean,
        'default': false
    }
});

NodeSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

NodeSchema.statics.getZone = function (options, cb) {
    var query = {};

    query = {
        $or: options.zones.map(function (zone) {
            return {
                zone: zone.name
            };
        }),
        'memory.avalibale': {
            $gte: options.size.memory
        },
        'cores.avalibale': {
            $gte: options.size.cpu
        },
        closing: false,
        multitenant: true
    };
    if (options.size.dedicated) {
        query.multitenant = false;
        query['memory.used'] = 0;
    }
    if (options.reserved) {
        query.reserved = true;
    } else {
        query.is_active = true;
    }
    this.findOne(query, null, {
        sort: {
            last_used: 1
        }
    }, function (err, node) {
        if (err) {
            return cb(err);
        }
        if (!node) {
            return cb();
        }
        node.last_used = Date.now();
        node.save(function () {
            cb(null, node);
        });
    });
};
module.exports = mongoose.model('Node', NodeSchema);
