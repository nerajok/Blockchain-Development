let uc = require("upper-case");


const greeter = () => {
	for(let i=0; i<10; i++){
		console.log(uc.upperCase("Hello World"));
	}
}

greeter();