window.onload = function(){ 

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null

// окно вывода результата
outputElement = document.getElementById("result")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
            a += digit
        }
        outputElement.innerHTML = a
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
            b += digit
            outputElement.innerHTML = b        
        }
    }
}

// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML
        onDigitButtonClicked(digitValue)
    }
});

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { 
    if (a === '') return
    selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() { 
    if (a === '') return
    selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() { 
    if (a === '') return
    selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() { 
    if (a === '') return
    selectedOperation = '/'
}
document.getElementById("btn_op_sign").onclick = function() { 
    if (a === '') return
	
	outputElement.innerHTML = (-parseFloat(outputElement.innerHTML)).toString()
	a = outputElement.innerHTML
}
document.getElementById("btn_op_percent").onclick = function() {
    if (a === '') return
    selectedOperation = '%'
        
    expressionResult = (+a) / 100;
    
    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    outputElement.innerHTML = a
}
document.getElementById("btn_op_backspace").onclick = function() {
    if (!selectedOperation) {
        a = a.slice(0, -1);
        outputElement.innerHTML = a || '0';
    } else {
        b = b.slice(0, -1);
        outputElement.innerHTML = b || '0';
    }
}
document.getElementById("btn_op_bg").onclick = function() {
	if (document.body.style.backgroundColor == ""){
		document.body.style.backgroundColor = "#4b4e53";
	}
	else{
		document.body.style.backgroundColor = "";
	}
}
document.getElementById("themech").onclick = function() {
	if (document.body.style.backgroundColor == ""){
		document.body.style.backgroundColor = "#4b4e53";
	}
	else{
		document.body.style.backgroundColor = "";
	}
}
document.getElementById("btn_op_sqrt").onclick = function() {
    selectedOperation = 'sqrt'
	a = '1'
}
document.getElementById("btn_op_step").onclick = function() {
    if (a === '') return;
    selectedOperation = 'step'
	b = '1'
}
document.getElementById("btn_op_fact").onclick = function() {
    if (a === '') return;
    selectedOperation = 'fact'
	b = '1'
}
document.getElementById("btn_add_000").onclick = function() {
    if (!selectedOperation) {
        a += '000';
        outputElement.innerHTML = a;
    } else {
        b += '000';
        outputElement.innerHTML = b;
    }
}

let saveSum = 0;
let saveSub = 0;
document.getElementById("btn_op_savesum").onclick = function() {
    if (a === '') return;
    
    saveSum += (+a)
    a = ''
    outputElement.innerHTML = saveSum
}
document.getElementById("btn_op_savesub").onclick = function() {
    if (a === '') return;
    
    saveSub -= (+a)
    a = ''
    outputElement.innerHTML = saveSub
}

document.getElementById("btn_op_inp").onclick = function() {
	if (outputElement.style.backgroundColor == ""){
		outputElement.style.backgroundColor = "#224";
	}
	else{
		outputElement.style.backgroundColor = "";
	}
}
document.getElementById("btn_indiv").onclick = function() {
	const nowval = parseFloat(outputElement.innerHTML)
	if (nowval <= 0) {
        return;
    }

    const log = Math.log(nowval)
    const log2 = Math.min(Math.max(log * 10, 0), 100)
    const bequal = document.getElementById("btn_op_mult")
    bequal.style.filter = `brightness(${log2}%)`
}


// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() { 
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
}

// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() { 
    if (a === '' || b === '' || !selectedOperation)
        return
        
    switch(selectedOperation) { 
        case 'x':
            expressionResult = (+a) * (+b)
            break;
        case '+':
            expressionResult = (+a) + (+b)
            break;
        case '-':
            expressionResult = (+a) - (+b)
            break;
        case '/':
            expressionResult = (+a) / (+b)
            break;
		case '%':
            expressionResult = (+a) / 100
            break;
		case 'sqrt':
			expressionResult = Math.sqrt(+b)
			break;
		case 'step':
			expressionResult = (+a) * (+a)
			break;
		case 'fact':
			let result = 1
			for (let i = 2; i <= (+a); i++) {
				result *= i
			}
			expressionResult = result
			break;
    }
    
    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    outputElement.innerHTML = a
}
};