const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
	name_owner: {
		type: String,
		required: true
	},
	name_apartment: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	rent: {
		type: Number
	},
	address: {
    type: String,
	},
});

module.exports = mongoose.model('property', propertySchema);
