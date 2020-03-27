
var comp = require('./comparer');

var num = require('./calculator');


//num.Add(4,5);
//num.Subtract(4,5);
//comp.AreNumbersEqual(5,5);


var fun = (x,y) => {
  console.log("comparing two numbers:" + x +","+ y);
  if (comp.AreNumbersEqual(x,y) == true){
    console.log("numbers are equal");
    console.log("Adding two numbers");
    num.Add(x,y);
  }else {
    console.log("numbers are not equal");
    console.log("Subtracting two numbers");
    num.Subtract(x,y);
  }
}

fun(5,5);
fun(6,5);
