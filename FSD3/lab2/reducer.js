const array = [1,2,3,5];

const add = (zero,adder) => zero + adder;

const multiply = (numb,multiplier) => numb * multiplier;

console.log(array.reduce(multiply));

console.log(array.reduce(add));

