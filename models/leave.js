const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
	requested_by: {
		id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
		name: String
  },
	start_date: {
		type: String,
		required: true
	},
	end_date: {
		type: String,
		required: true
	},
	reason: {
		type: String,
		required: true
	},
	requested_at: {
		type: Date,
		default: Date.now
	},
	leave_type: {
			type: String,
			enum: ['MEDICAL', 'FAMILY', 'OTHERS'],
			default: 'OTHERS'
	},
	approval_status: {
			type: String,
			enum: ['PENDING', 'APPROVED', 'REJECTED'],
			default: 'PENDING'
	},
});

module.exports = mongoose.model('Leaves', leaveSchema);
