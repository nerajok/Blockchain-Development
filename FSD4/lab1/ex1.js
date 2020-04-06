class Car{

constructor(model,year){
this.model = model;
this.year = year;
}
details = (model,year) =>{
	console.log(`Model: ${model} Engine:${year}`);
}
}

class Sedan extends Car{

constructor(model,year){
super(model,year,balance);
this.balance = balance;
}
info = (model,balance) =>{
	console.log(`${model} has a balance of ${balance}`);
}
}

const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details());

const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info());
