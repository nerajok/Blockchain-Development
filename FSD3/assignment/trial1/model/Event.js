
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	event_name:{
		type: String,
		require: true
	},
	timestamp:{
		type:String,
		require: true
	}
});

const Event = mongoose.model('Event', eventSchema, 'Events');
module.exports = Event;
