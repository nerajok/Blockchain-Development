const http = require("http"),
  url = require("url"),
  fs = require("fs");


const mongoose = require("mongoose");
mongoose.connect('mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');

const connectionString = "mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
	.connect(connectionString, { useNewUrlParser: true})
	.then(  () => {console.log("Mongoose connected successfully"); },
	error => { console.log("Mongoose could not be connected to database: " + error);}
);



const express = require('express');
const moment = require('moment');
const app = express()
var timestamp = moment(new Date()).format('MMMM Do YYYY : h:mm:ss a');

const Event = require('./model/Event');
const Chat = require('./model/Chat');

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
				console.log("Username Changed" + " " + timestamp)

				Event.create([
		      {
						event_name:"Changed username to "+ socket.username,
		        timestamp: timestamp,
		      }
		    ])    .then(() => console.log("Message Stored in DB"))
		        .catch(e => console.log(e));

		})

		socket.on('connected', (data) => {
				//console.log(data.message);
				console.log(socket.username + " " + data.message + " " + timestamp);

				Event.create([
		      {
						event_name:"New User Connected",
		        timestamp: timestamp,
		      }
		    ])    .then(() => console.log("Message Stored in DB"))
		        .catch(e => console.log(e));

				io.sockets.emit('user_connected',{username: socket.username});
		})

		socket.on('disconnected', (data) => {
				//socket.username = data.username;
				console.log(socket.username + " " + data.message + " " + timestamp);

				Event.create([
					{
						event_name:socket.username + " disconnected",
						timestamp: timestamp,
					}
				])    .then(() => console.log("Message Stored in DB"))
						.catch(e => console.log(e));

				io.sockets.emit('user_disconnected',{username: socket.username});
		})

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username,timestamp: moment(new Date()).format('Do YYYY : h:mm:ss a')});
				console.log(socket.username + ":" + data.message + " " + timestamp);

		//Here Starts chat storage for mongoDB
		Chat.create([
      {
				Username:socket.username,
        chat : data.message,
        timestamp: timestamp,
      }
    ])    .then(() => console.log("Message Stored in DB"))
        .catch(e => console.log(e));

		})

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
