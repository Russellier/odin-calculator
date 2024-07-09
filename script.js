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
let operator = 'divide';

function operate(a, b, operator) {
  switch (operator) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
  }
}

console.log( add(x, y) );
console.log( subtract(x, y) );
console.log( multiply(x, y) );
console.log( divide(x, y) );

console.log( operate(x, y, operator) );