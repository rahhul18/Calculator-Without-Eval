const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".input__field");
const output = document.querySelector(".output__field");

let currInput = "";
let result = "";

// for display button
buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        const val = e.target.value;
        HandleCount(val)
    });
});

// for keyboard events
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const key = e.key;
    if (key === 'Enter' || key === '=') {
        HandleCount('=');
    } else if (key === 'Backspace') {
        HandleCount('←');
    } else if (key === 'C' || key=== "c") {
        HandleCount('c');
    } else if (operators.includes(key)) {
        HandleCount(key);
    } else if (!isNaN(key) && key.trim() !== '') {
        HandleCount(key);
    }else if (key === "." ){
        HandleCount(key);
    }else if (key === "(" || key === ")"){
        HandleCount(key);
    }
});

function HandleCount(val) {
    if (val === "c") {
        currInput = '';
        display.innerHTML = '';
        output.innerHTML = '';
        result = '';
    } else if (val === "←") {
        currInput = currInput.slice(0, -1);
        display.innerHTML = currInput;
    } else if (val === "=") {
        currInput = Calculate(currInput);
       if (!isNaN(result)){
           output.innerHTML = result;
           currInput = result;
       }else {
           output.innerHTML = 'Enter Valid Value';
       }
    }else {
        currInput += val;
        display.innerHTML = currInput;
    }
}

let operators = ['/', '*' , '+' ,'-' ];
let operator = '';
let a = null;
let b = null;

function Calculate(currInput) {
    // console.log(`old => ${currInput} ${typeof currInput}`)
    const regex = /\d+(\.\d+)?|\+|\-|\(|\)|\*|\//g;
    let newCurrValue = currInput.match(regex);

    // console.log(`new => ${newCurrValue} ${typeof newCurrValue}`)


  // for bracket values
    while (newCurrValue.includes('(')) {
        const firstBracketIndex = newCurrValue.indexOf('(')
        const lastBracketIndex = newCurrValue.indexOf(')')
        // console.log(newCurrValue[firstBracketIndex])

        const calculateBracket = newCurrValue.slice(firstBracketIndex + 1, lastBracketIndex)
        // console.log(`calBracket ${calculateBracket}`);

        for (let i = 0; i <= operators.length; i++) {
            const operatorIndex = calculateBracket.indexOf(operators[i]);
            // console.log(`index operator ${operatorIndex}`)

            if (operatorIndex !== -1) {
                operator = operators[i];
                a = Number(calculateBracket.slice(0, operatorIndex))
                b = Number(calculateBracket.slice(operatorIndex + 1))
            } else {
                output.innerHTML = 'Enter Valid Value';
            }
        }
        newCurrValue[firstBracketIndex] = calculateValues(operator, a, b);
        // console.log(calculateValues(operator, a, b))
        newCurrValue.splice(firstBracketIndex + 1, (lastBracketIndex - firstBracketIndex));

        // console.log(`bracket output => ${newCurrValue} ${typeof newCurrValue}`)
    }

    for (let i = 0; i<=operators.length; i++) {
        evaluateValue(newCurrValue)
    }
    result = newCurrValue;
    console.log(`last output=> ${result} `)
}
function evaluateValue(newCurrValue){

    for (let i = 0; i <= operators.length; i++) {
        const operatorIndex = newCurrValue.indexOf(operators[i]);
        // console.log(`index operator ${operatorIndex}`)

        if (operatorIndex !== -1) {
            operator = operators[i];
            a = Number(newCurrValue.slice(operatorIndex-1, operatorIndex));
            b = Number(newCurrValue.slice(operatorIndex + 1 , operatorIndex+2));
        } else {
            output.innerHTML = 'Enter Valid Value';
        }

        newCurrValue[operatorIndex - 1] = calculateValues(operator, a, b);
        newCurrValue.splice(operatorIndex, operatorIndex + 1)
    }
}
function calculateValues(operator , a , b){
    switch (operator){
        case '+' : return a + b;
        case '-' : return a-b;
        case '*' : return a * b;
        case '/' : return a / b;
        default : return currInput;
    }
}