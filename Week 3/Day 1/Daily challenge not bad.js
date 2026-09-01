
let sentence = "The movie is not that bad, I like it";

let wordNot = sentence.indexOf("not");

let wordBad = sentence.indexOf("bad");

if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {

  let toReplace = sentence.slice(wordNot, wordBad + 3);
  let result = sentence.replace(toReplace, "good");
  console.log(result);
} else {
  console.log(sentence);
}