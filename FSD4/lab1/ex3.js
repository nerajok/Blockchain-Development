const arrayOfNames = ['jaxx' , 'tiny', 'clay']
const mixedArray = ['anarchy', 99, true]


const makeUpperCase = (upperArray) => {
    return new Promise((resolve, reject) => {
        try{
            let check = upperArray.filter(value => typeof value !== 'string')
            if(check.length == 0){
                let result = upperArray.map(x => x.toUpperCase())
                resolve(result);
                return;
            }
            else{
                throw new Error(`Not all the items in the array are string`);
            }
        }catch(error) {
            reject(`${error}`);
            return;
          }
    });
  };

  const sortWords = (arr) => {
    return new Promise((resolve, reject) => {
        try{
            let check = sortArray.filter(value => typeof value !== 'string')
            if(check.length == 0){
                let result = arr.sort()
                resolve(result);
                return;
            }
            else{
                throw new Error(`Not all the items in the array are string`);
            }
        }catch(error) {
            reject(`${error}`);
            return;
          }
    });
  };

makeUpperCase(arrayOfNames)
  .then(result => sortWords(result))
  .then(result => console.log(result))
  .catch(error => console.log(error))

makeUpperCase(mixedArray)
  .then(result => sortWords(result))
  .then(result => console.log(result))
  .catch(error => console.log(error))