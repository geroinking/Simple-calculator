"use strict";
let numbers = document.querySelectorAll('.buttons__number'),
    operators = document.querySelectorAll('.operator'),
    display = document.getElementById('display'),
    ce = document.getElementById('ce'),
    result = document.getElementById('result'),
    decimal = document.getElementById('decimal'),
    memoryCurrentNumber = '0',
    memoryNewNumber = false,
    memoryPendingOperation = '';

function numberPress(number) {
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operatorPress(oper) {
    let localOperationMemory = display.value;

    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '/') {
            memoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            memoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = memoryCurrentNumber;
        memoryPendingOperation = oper;
    }
}

function decimalPress(e) {
    let localDecimalMemory = display.value;

    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        memoryNewNumber = true;
        memoryCurrentNumber = '0';
        memoryPendingOperation = '';
    }
}

for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < operators.length; i++) {
    var operator = operators[i];
    operator.addEventListener('click', function (e) {
        operatorPress(e.target.textContent);
    });
}


decimal.addEventListener('click', decimalPress);

ce.addEventListener('click', function (e) {
    clear(e.srcElement.id);
});
