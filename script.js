"use strict";

const displayWindow = document.querySelector('p.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalSignBtn = document.querySelector('.equal-sign');

let x;
let y;
let answer;
let operator = '';
let isOperatorClicked = false;

function add(a, b) {
  return answer = a + b;
}

function subtract(a, b) {
  return answer = a - b;
}

function multiply(a, b) {
  return answer = a * b;
}

function divide(a, b) {
  if (b === 0) return answer = 'Error'
  return answer = a / b;
}

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

// fix: user can input decimal point multiple times
// fix: user can input 0 multiple times. e.g. '00000005'
numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    if (isOperatorClicked) {
      displayWindow.textContent = '';
      isOperatorClicked = false;
    }
    displayWindow.textContent += button.innerText;
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    isOperatorClicked = true;
    operator = button.innerText;
    if (!x) x = displayWindow.textContent;
    else if (!y) y = displayWindow.textContent;
    else operate(x, y, operator);
    console.log(`${x} ${operator} ${y} : ${answer}`);
  });
});
