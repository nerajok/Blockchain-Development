
var moment = require('moment');
var events = require('events');
var eventEmitter = new events.EventEmitter;

var currentTimeCallback = () => {
  console.log("Current Time: " + moment().format('h:mm:ss a'));
}

eventEmitter.on('currentTime',currentTimeCallback);

eventEmitter.emit('currentTime');
