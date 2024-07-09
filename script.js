"use strict";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 'Error'
  return a / b;
}

let x = 65132312;
let y = 9846351;

console.log( add(x, y) );
console.log( subtract(x, y) );
console.log( multiply(x, y) );
console.log( divide(x, y) );