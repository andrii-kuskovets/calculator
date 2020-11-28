import React, {useState} from 'react';
import {BUTTONS} from '../../ConstantsBtns';
import './_main.scss';

let divStyle = {
    fontSize: '120px',
};

const MAX_INPUT = 9;
const EXPONENTIAL_FRACTION_DIGITS = 2;

function toNumber(str) {
    return parseFloat(str.replace(',', '.'));
}

function toStr(number) {
    return number.toString().replace('.', ',');
}
function calculate(left, right, operation)
{
    if(operation === '÷' && right === 0.0){
        alert("Divide by zero is undefined");
        return right;
    }
    switch (operation) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '÷':
            return left / right;
        case '*':
            return left * right;
        default:
            alert("Unknown operation");
            return 0;
    }
}
function operator(left, operation, right) {
    return toStr(calculate(toNumber(left), toNumber(right), operation));
}

function reverse(number) {
    return -number;
}

function percent(number) {
    return number / 100.0;
}

function Main() {
    const [display, setDisplay] = useState("0");
    const [right, setRight] = useState("none");
    const [newInput, setNewInput] = useState(false);
    const [memory, setMemory] = useState("0");
    const [operation, setOperation] = useState('none');

    function updateDisplay(value) {
        let result = value.length > MAX_INPUT
            ? toStr(toNumber(value).toExponential(EXPONENTIAL_FRACTION_DIGITS))
            : value;

        result.length > 6
            ? divStyle = {fontSize: '80px'}
            : divStyle = {fontSize: '120px'};

        setNewInput(false);
        setDisplay(result);
    }

    function typeNumber(symbol) {
        if (symbol === ',' && display.indexOf(',') !== -1) {
            return;
        }

        function put(symbol) {
            if(display === "0" || newInput) {
                return symbol === ',' ? '0,' : symbol;
            }
            else if(display.length < MAX_INPUT) {
                return display + symbol;
            }
            return display;
        }

        updateDisplay(put(symbol));
    }

    function calcResult() {
        if(right !== "none"  && !newInput)
        {
            let result = operator(right, operation, display);
            updateDisplay(result);
            setRight(result);
        }
        else
        {
            setRight(display);
        }
        setNewInput(true);
    }

    function handleInput(e) {
        const typeBtn = e.target.getAttribute("data-type");
        const valueBtn = e.target.getAttribute("data-value");

        switch (typeBtn) {
            case "number":{
                typeNumber(valueBtn);
                break;
            }
            case "clear":{
                setRight("none");
                setDisplay("0");
                setNewInput(true);
                break;
            }
            case "plus-minus":{
                updateDisplay(toStr(reverse(toNumber(display))));
                break;
            }
            case "percent":{
                updateDisplay(toStr(percent(toNumber(display))));
                break;
            }
            case "symbol":{
                calcResult();
                setOperation(valueBtn);
                break;
            }
            case "equal":{
                calcResult();
                setRight("none");
                break;
            }
            case "memory-clear":{
                setMemory("0");
                break;
            }
            case "memory-read":{
                updateDisplay(memory);
                break;
            }
            case "memory-minus":{
                setMemory(operator(memory, "-", display));
                break;
            }
            case "memory-plus":{
                setMemory(operator(memory, "+", display));
                break;
            }
            default:
                alert(1);
                break;
        }
    }

    return (
        <div className='wrapper'>
            <div className='screen'>
                <p style={divStyle} id="result">{display}</p>
            </div>
            <div className="buttons">
                {BUTTONS.map((item, i) => (
                    <button key={i} className='buttons__item' data-type={item.type} data-value={item.value} onClick={handleInput}>{item.value}</button>
                ))}
            </div>
        </div>
    );
}

export default Main;
export {
    calculate
    , reverse
    , percent
    , toNumber
    , toStr
};