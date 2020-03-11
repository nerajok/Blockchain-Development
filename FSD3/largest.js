
var a = 270;
var b = 40;
var c = 90;

largest(a,b,c);

function largest (a,b,c){
  if(a>b){
    if(a>c){
      console.log(a);
      }
      else{
        console.log(c);
      }
    }
    else if(b>a){
      if(b>c){
      console.log(b);
      }
      else{
        console.log(c);
      }
    }
  else {
    console.log("error");
  }
}