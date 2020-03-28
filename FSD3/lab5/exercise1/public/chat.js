
$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	var connected = $("#connect")
	var disconnected = $("#disconnect")
//	var send_message_hello = $("#send_message_hello")


/*	//Emit message
	send_message_hello.click(function(){
		socket.emit('send_message_hello', {message : "Hello World"})
	})
*/

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Emit Connection
	connected.click(function(){
		socket.emit('connected', {message : "Connection accepted"})
	})

	//Emit Disonnection
	disconnected.click(function(){
		socket.emit('disconnected', {message : "Disconnected..."})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
		//console.log(data.message);
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});
