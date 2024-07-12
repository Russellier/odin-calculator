'use strict';

const displayWindow = document.querySelector('p.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const negateBtn = document.querySelector('.negate');
const squaredBtn = document.querySelector('.squared');
const maxDisplayLength = 12;

let x;
let y;
let answer;
let operator = '';
let isOperatorClicked = false;
let isNumberClicked = false;

displayWindow.textContent = '0';

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
  if (b === 0) return 'Error';
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

//  fix: limit answer display length
//    show as exponent or round of decimal numbers
numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    isNumberClicked = true;
    let charToAdd = button.innerText;

    // Clear display for next number input
    if (isOperatorClicked) {
      displayWindow.textContent = '';
      isOperatorClicked = false;
    }

    // Prevent multiple decimal points
    if (displayWindow.textContent.includes('.') && charToAdd === '.')
      charToAdd = '';

    // Prevent multiple zeroes
    if (displayWindow.textContent === '0')
      if (charToAdd === '0') charToAdd = '';
      else if (charToAdd != '.') displayWindow.textContent = '';

    // Prevent overflow from input
    if (displayWindow.textContent.length <= maxDisplayLength)
      displayWindow.textContent += charToAdd;
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    isOperatorClicked = true;

    // Prevent multiple operations without entering new number
    if (isNumberClicked) {
      if (!x) x = Number(displayWindow.textContent);
      else if (!y) y = Number(displayWindow.textContent);
    }

    if (x && y) answer = operate(x, y, operator);

    operator = button.innerText;

    console.log(`x: ${x} ${operator} y: ${y} answer: ${answer}`);

    if (answer) {
      displayWindow.textContent = answer;
      x = answer;
      y = '';
      answer = '';
    }
    // if (operator === '=') x = '';

    isNumberClicked = false;
  });
});

clearBtn.addEventListener('click', () => {
  x = '';
  y = '';
  answer = '';
  operator = '';
  displayWindow.textContent = '0';
});

deleteBtn.addEventListener('click', () => {
  // Delete only if display is from user (i.e. not answer)
  if (!isNumberClicked) return;

  if (
    (displayWindow.textContent.includes('-') &&
      displayWindow.textContent.length === 2) ||
    displayWindow.textContent.length === 1
  )
    displayWindow.textContent = '0';
  else displayWindow.textContent = displayWindow.textContent.slice(0, -1);
});

negateBtn.addEventListener('click', () => {
  if (displayWindow.textContent === '0') return;

  if (displayWindow.textContent.includes('-'))
    displayWindow.textContent = displayWindow.textContent.slice(1);
  else displayWindow.textContent = '-' + displayWindow.textContent;
});

squaredBtn.addEventListener('click', () => {
  isOperatorClicked = true;
  answer = Number(displayWindow.textContent) ** 2;
  displayWindow.textContent = answer;
});
