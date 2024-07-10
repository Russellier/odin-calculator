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

function operate(a, b, operator) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'X':
      return multiply(a, b);
    case '/':
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

    if (!x) x = parseInt(displayWindow.textContent);
    else if (!y) y = parseInt(displayWindow.textContent);

    if (x && y) answer = operate(x, y, operator);

    if (answer) displayWindow.textContent = answer;

    console.log(`${x} ${operator} ${y} : ${answer}`);
    operator = button.innerText;
  });
});

