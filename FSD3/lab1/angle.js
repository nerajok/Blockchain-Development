
var sol = "";

angle = 90;

findAngle(angle)

function findAngle(angle){
  if(angle == 90){
    sol = "right";
  }
  else if(angle>90){
    if (angle == 180){
      sol = "straight";
    }else{
    sol = "obtuse";
  }
  }
  else if(angle<90){
    sol = "acute";
  }
  else{
    sol = "unknown angle"
  }
  console.log(sol);
}

