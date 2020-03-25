const say = require('say');

say.speak('Hello!');

say.stop()

say.speak("Hello?", 'Alex', 0.5);


var sorryDave = () => {
	say.speak("I'm sorry, Dave", 'Alex', 0.5);
}

sorryDave();


setTimeout(function alex(){
	say.speak("Hello, Alex");
},3000);
