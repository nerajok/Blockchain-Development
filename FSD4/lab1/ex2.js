
let number = 5;

const compareNumToTen = (number) => {
	return new Promise((resolve,reject) => {
		if(number>10) resolve(number);
		else reject(number);
	});
};

compareNumToTen(number)
	.then((number) => {
		console.log(`${number} is greater than 10!`);
	})
	.catch(() => {
		console.log(`${number} is less than 10, error!`);
	});
	
