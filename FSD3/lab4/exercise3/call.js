var events = require('events');
var eventEmitter = new events.EventEmitter();

var fn = function(){
  console.log("Call me.");
}

eventEmitter.on('call',fn);
eventEmitter.emit('call');
