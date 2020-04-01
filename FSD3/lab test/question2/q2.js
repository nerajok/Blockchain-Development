const mixedArray = ['Matrix',1,true,2,false,3]

const multiplyNumbers = (nums) => {
//  console.log(nums);
//  let booler = nums.filter(Boolean);
//  console.log(booler);
  let filtered = nums.filter(number => Number.isInteger(number));
  let mapper = filtered.map(x => x * 5);
  console.log(mapper);
}

multiplyNumbers(mixedArray);
