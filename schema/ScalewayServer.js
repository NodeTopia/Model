var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScalewayServerSchema = new Schema({
	state_detail : {
		type : String
	},
	image : Schema.Types.Mixed,
	creation_date : {
		type : Date
	},
	public_ip : {
		dynamic : {
			type : Boolean
		},
		id : {
			type : String
		},
		address : {
			type : String
		}
	},
	private_ip : {
		type : String
	},
	location : {
		platform_id : {
			type : Number
		},
		node_id : {
			type : Number
		},
		blade_id : {
			type : Number
		},
		zone_id : {
			type : String
		},
		chassis_id : {
			type : Number
		}
	},
	id : {
		type : String
	},
	dynamic_ip_required : {
		type : Boolean
	},
	modification_date : {
		type : Date
	},
	enable_ipv6 : {
		type : Boolean
	},
	hostname : {
		type : String
	},
	state : {
		type : String
	},
	bootscript : Schema.Types.Mixed,
	ipv6 : {
		netmask : {
			type : String
		},
		gateway : {
			type : String
		},
		address : {
			type : String
		}
	},
	commercial_type : {
		type : String
	},
	tags : [{
		type : String
	}],
	arch : {
		type : String
	},
	extra_networks : [],
	name : {
		type : String
	},
	volumes : Schema.Types.Mixed,
	security_group : {
		id : {
			type : String
		},
		name : {
			type : String
		}
	},
	dns : {
		pub : {
			type : String
		},
		priv : {
			type : String
		}
	},
	organization : {
		type : String
	}

});

module.exports = mongoose.model('ScalewayServer', ScalewayServerSchema);
