// libs
const prompt = require("prompt-sync")();
const fs = require("fs");

// read file content line by line
const readFile = (fileName) => {
  const broadbandLines = fs.readFileSync(fileName, "utf8");
  return broadbandLines.split("\r\n");
};
// get cnt of vowels from certain str
const countVowels = (str) => str.match(/[aeiou]/gi).length;
// get cnt of consonants from certain str
const countConsonants = (str) => str.match(/[^aeiou]/gi).length;
// get length elements except "1"
const getLenElements = (str) =>
  str.match(/[\d]/g).filter((item) => item !== "1");
const getSS = (destName, driverName) => {
  let ss = 0;
  if (destName.length % 2) ss = countVowels(driverName) * 1.5;
  else ss = countConsonants(driverName);

  const destLenFactor = getLenElements(String(destName.length));
  const driverLenFactor = getLenElements(String(driverName.length));

  const found = driverLenFactor.find((item) => {
    if (destLenFactor.find((destFactor) => destFactor === item)) return true;
    return false;
  });

  if (found) ss *= 1.5;
  return ss;
};

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// result
let ssResult = 0;

// display to input dest or driver file name
const driverFile = prompt("Driver File Name?");
const destFile = prompt("Destination File Name?");

// read data from file
const destArray = readFile(destFile);
const driverArray = readFile(driverFile);

// something went wrong
if (destArray.length !== driverArray.length) process.exit();

// calculate SS
for (let i = 0; i < destArray.length; i++) {
  ssResult += getSS(destArray[i], driverArray[i]);
}

console.log(ssResult);
