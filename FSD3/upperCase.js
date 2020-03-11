
var sentence = "the quick brown fox";

splited = sentence.split(' ');

for(let i=0; i<splited.length; i++) {
    upperChar = splited[i].charAt(0).toUpperCase()
    len = splited[i].length;
    word = splited[i].substring(1, len)
    splited[i] = upperChar + word;
}

console.log(splited.join(' '));
