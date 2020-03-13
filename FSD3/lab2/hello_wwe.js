


const greeter = (myArray,counter) => {
  let greetText = "Hello";

  for (let greet of myArray){
    console.log(`${greetText} ${greet}`);
  }
}

greeter(['Randy Savage','Ric Flair','Hulk Hogan'],3);