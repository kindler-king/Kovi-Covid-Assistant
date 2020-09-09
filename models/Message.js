const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
	{
		query: {
			type: String,
			required: true
		},
		response: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Message', MessageSchema);
