
const difference = (x) => {
  if(x>13){
    return 2*(Math.abs(x-13));
  }
  else{
    return Math.abs(x - 13);
  }
}

console.log(difference(32));
console.log(difference(11));