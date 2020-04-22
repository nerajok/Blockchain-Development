$(function() {
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
    var chatroom1 = $("#chatroom1")
    var chatroom2 = $("#chatroom2")

    var chatlog = $("#chatlog")
    var eventlog = $("#eventlog")
    var chat1 = $("#chat1")
    var chat2 = $("#chat2")

    chatlog.click(function() {
        socket.emit('chatlog')
    })

    eventlog.click(function() {
        socket.emit('eventlog')
    })

    chat1.click(function() {
        socket.emit('chat1')
    })

    chat2.click(function() {
        socket.emit('chat2')
    })


    //Emit message
    send_message.click(function() {
        socket.emit('new_message', {
            message: message.val()
        })
    })

    //change chatroom
    chatroom1.click(function() {
        socket.emit('chatroom1', {
            message: "You joined chatroom1"
        })
    })

    //change chatroom
    chatroom2.click(function() {
        socket.emit('chatroom2', {
            message: "You joined chatroom2"
        })
    })

    //Emit Connection
    connected.click(function() {
        socket.emit('connected', {
            message: "Connection accepted"
        })
    })

    //Emit Disonnection
    disconnected.click(function() {
        socket.emit('disconnected', {
            message: "Disconnected..."
        })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp" + "@" + data.timestamp + "</p>");
        //console.log(data.message);
    })

    //For user connected
    socket.on("user_connected", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + " joined this chat!" + "</p>");
    })

    //For user disconnected
    socket.on("user_disconnected", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + " has left this chat!" + "</p>");
    })

    socket.on("changeroom", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + " has left this chatroom!" + "</p>");
        chatroom.append("<p class='message'>" + data.username + " has joined" + data.chatroom + "</p>");
    })

    //Emit a username
    send_username.click(function() {
        socket.emit('change_username', {
            username: username.val()
        })
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
