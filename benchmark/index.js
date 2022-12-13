// run using  ts-node benchmark/index.js

const XSadd = require("../src/xsadd.ts").default;

console.time("Math.random");

let result = 0;
for (let i = 0; i < 1e7; i++) {
  result += Math.random();
}
console.log(result);
console.timeEnd("Math.random");
console.log(result);

console.time("XSadd.random");
let result2 = 0;
const xsAdd = new XSadd();
for (let i = 0; i < 1e7; i++) {
  result2 += xsAdd.random(0);
}
console.log(result2);
console.timeEnd("XSadd.random");
