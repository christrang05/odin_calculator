document.addEventListener('DOMContentLoaded', () => {
    const resultBox = document.getElementById('result');
    let currentInput = '';
    let operation = null;
    let previousInput = '';

    document.querySelectorAll('.calculator-keys button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (parseFloat(value) >= 0 || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
            } else {
                switch (value) {
                    case '+':
                    case '-':
                    case 'x':
                    case '÷':
                        previousInput = currentInput;
                        currentInput = '';
                        operation = value;
                        break;
                    case '=':
                        currentInput = operate(previousInput, currentInput, operation);
                        updateDisplay(currentInput);
                        operation = null;
                        break;
                    case '%':
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        updateDisplay(currentInput);
                        break;
                    case '±':
                        currentInput = (parseFloat(currentInput) * -1).toString();
                        updateDisplay(currentInput);
                        break;
                    case 'AC':
                        resetCalculator();
                        break;
                }
            }
        });
    });

    function updateDisplay(value) {
        resultBox.innerText = value;
    }

    function operate(firstNum, secondNum, operation) {
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);

        if (isNaN(firstNum) || isNaN(secondNum)) return '';

        switch (operation) {
            case '+': return firstNum + secondNum;
            case '-': return firstNum - secondNum;
            case 'x': return firstNum * secondNum;
            case '÷':
                if (firstNum === 0 || secondNum === 0) {
                    return 0;
                }
                return firstNum / secondNum
            default: return '';
        }
    }

    function resetCalculator() {
        currentInput = '';
        operation = null;
        previousInput = '';
        updateDisplay('0');
    }
});
