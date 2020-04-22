const http = require("http"),
    url = require("url"),
    fs = require("fs");


let cors = require('cors');
let bodyParser = require('body-parser');
const express = require('express');
let router = express.Router();


const moment = require('moment');
const app = express();
var timestamp = moment(new Date()).format('MMMM Do YYYY : h:mm:ss a');

const mongoose = require("mongoose");
mongoose.connect('mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');

const connectionString = "mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
    .connect(connectionString, {
        useNewUrlParser: true
    })
    .then(() => {
            console.log("Mongoose connected successfully");
        },
        error => {
            console.log("Mongoose could not be connected to database: " + error);
        }
    );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());


const Event = require('./models/Event');
const Chat = require('./models/Chat');

// Allow cross origin resource sharing
/* app.use((req,res,next) =>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
}); */


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/chats', (req, res) => {
    Chat.find({} , (error, data) => {
        if (error) {
            console.log({error});
        } else {
            return res.send(data)
        }
    })
})

app.get('/events' ,function(req, res){
    Event.find({} , (error, data) => {
        if (error) {
              console.log({error});
        } else {
            return res.send(data)
        }
    })
})

var porty = process.env.PORT || 3000
server = app.listen(porty)

// app.get('/',function(req, res){
//     Chat.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })


// app.get('/chats',function(req, res){
//     Chat.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })




//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous";

    socket.room = "chatroom1";

    socket.on('chatroom2', (data) => {
        socket.room = "chatroom2";
        console.log(data.message);
        io.sockets.emit('changeroom', {
            username: socket.username,
            chatroom: socket.room
        });
    })

    socket.on('chatroom1', (data) => {
        socket.room = "chatroom1";
        console.log(data.message);
        io.sockets.emit('changeroom', {
            username: socket.username,
            chatroom: socket.room
        });
    })

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
        console.log("Username Changed" + " " + timestamp)

        Event.create([{
                event_name: "Changed username to " + socket.username,
                timestamp: timestamp,
            }]).then(() => console.log("Message Stored in DB"))
            .catch(e => console.log(e));

    })

    socket.on('connected', (data) => {
        //console.log(data.message);
        console.log(socket.username + " " + data.message + " " + timestamp);

        Event.create([{
                event_name: "New User Connected",
                timestamp: timestamp,
            }]).then(() => console.log("Message Stored in DB"))
            .catch(e => console.log(e));

        io.sockets.emit('user_connected', {
            username: socket.username
        });
    })

    socket.on('disconnected', (data) => {
        //socket.username = data.username;
        console.log(socket.username + " " + data.message + " " + timestamp);

        Event.create([{
                event_name: socket.username + " disconnected",
                timestamp: timestamp,
            }]).then(() => console.log("Message Stored in DB"))
            .catch(e => console.log(e));

        io.sockets.emit('user_disconnected', {
            username: socket.username
        });
    })


    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username,
            chatroom: socket.room,
            timestamp: moment(new Date()).format('Do YYYY : h:mm:ss a')
        });
        console.log(socket.username + ":" + data.message + " " + timestamp);

        //Here Starts chat storage for mongoDB
        Chat.create([{
                Username: socket.username,
                chat: data.message,
                chatroom: socket.room,
                timestamp: timestamp,
            }]).then(() => console.log("Message Stored in DB"))
            .catch(e => console.log(e));

    })

    socket.on('chatlog', () => {
        Chat.find({}, function(err, docs) {
            if (!err) {
                console.log(docs);
            } else {
                throw err;
            }
        });
    })

    socket.on('chat2', () => {
        Chat.find({
            "chatroom": {
                $eq: "chatroom2"
            }
        }, function(err, docs) {
            if (!err) {
                console.log(docs);
            } else {
                throw err;
            }
        });
    })

    socket.on('chat1', () => {

        Chat.find({
            "chatroom": {
                $eq: "chatroom1"
            }
        }, function(err, docs) {
            if (!err) {
                console.log(docs);
            } else {
                throw err;
            }
        });
    })

    socket.on('eventlog', () => {
        Event.find({}, function(err, docs) {
            if (!err) {
                console.log(docs);
            } else {
                throw err;
            }
        })
    })


    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    })
})




////////////////////////////////////////////////////////////////////


// let express = require('express');
// let mongoose = require('mongoose');
// let cors = require('cors');
// let bodyParser = require('body-parser');
// let database = require('./database/db');
//
//
// const userRoute = require('../server/routes/user.routes')
//
// mongoose.connect('mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/fsd4?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');
//
// const connectionString = "mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/fsd4?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
//
// mongoose.Promise = global.Promise;
// mongoose.connect(connectionString, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log('Database connected sucessfully !')
// },
//     error => {
//         console.log('Database could not be connected : ' + error)
//     }
// )
//
//
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(cors());
// app.use('/users', userRoute)
//
//
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })
//
// // Error Handling
// app.use((req, res, next) => {
//     next(createError(404));
// });
//
// app.use(function (err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// });
