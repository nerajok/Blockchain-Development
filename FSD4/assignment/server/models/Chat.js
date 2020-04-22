
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
	Username:{
		type: String,
		require: true
	},
	chat:{
		type: String,
		require: true
	},
	chatroom:{
		type: String,
		require: true
	},
	timestamp:{
		type:String,
		require: true
	}
});
const Chat = mongoose.model('Chat', chatSchema, 'Chats');
module.exports = Chat;
