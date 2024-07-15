'use strict';

const displayWindow = document.querySelector('p.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const negateBtn = document.querySelector('.negate');
const squaredBtn = document.querySelector('.squared');
const maxDisplayLength = 12; // font-size dependent
const charsInExp = 4; // number of constant characters in exp notation

let num1;
let num2;
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
    // After operator: displays '.1' should be '0.1'
    if (displayWindow.textContent.includes('.') && charToAdd === '.')
      charToAdd = '';

    // Prevent multiple zeroes
    if (displayWindow.textContent === '0')
      if (charToAdd === '0') charToAdd = '';
      else if (charToAdd != '.') displayWindow.textContent = '';

    // Prevent display overflow from input
    if (displayWindow.textContent.length <= maxDisplayLength)
      displayWindow.textContent += charToAdd;
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    isOperatorClicked = true;

    // Prevent multiple operations without entering new number
    if (isNumberClicked) {
      if (!num1) num1 = Number(displayWindow.textContent);
      else if (!num2) num2 = Number(displayWindow.textContent);
    }

    if (num1 && num2) answer = operate(num1, num2, operator);

    // console.log(`num1: ${num1} ${operator} num2: ${num2} answer: ${answer}`);

    operator = button.innerText;

    // Create separate function
    if (answer) {
      if (answer.toString().length > maxDisplayLength) {
        // Prevent display overflow from answer
        // Round off decimal numbers for answers less than a certain number
        if (answer >= 1e100)
          answer = answer.toExponential(maxDisplayLength - charsInExp - 2);
        else if (answer >= 1e10)
          answer = answer.toExponential(maxDisplayLength - charsInExp - 1);
        else if (answer <= 1e-100)
          answer = answer.toExponential(maxDisplayLength - charsInExp - 3);
        else if (answer <= 1e-10)
          answer = answer.toExponential(maxDisplayLength - charsInExp - 2);
        else if (answer <= 1e-1)
          answer = answer.toExponential(maxDisplayLength - charsInExp - 1);
        else
          answer = answer.toFixed(
            maxDisplayLength - answer.toString().indexOf('.')
          );
      }

      displayWindow.textContent = answer;
      num1 = Number(answer);
      num2 = '';
      answer = '';
    }

    isNumberClicked = false;
  });
});

clearBtn.addEventListener('click', () => {
  num1 = '';
  num2 = '';
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
