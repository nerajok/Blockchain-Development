
var events = require('events');
var eventEmitter = new events.EventEmitter;

var tone = function(){
  console.log("Alarm has been triggered!");
}

var emergen = function(){
  console.log("call 911!");
}

eventEmitter.on('alarm',tone)
.on('alarm',emergen);


eventEmitter.emit('alarm');
