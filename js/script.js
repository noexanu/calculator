const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
let arr = [];
buttons.forEach((e) => {
	e.addEventListener('click', function () {
		switch (this.innerText) {
			case '=':
				let inputNumber = '';
				const addNumber = (number) => {
					if (inputNumber != '') {
						arr.push(parseFloat(inputNumber))
						inputNumber = '';
					}
				}

				for (symbol of result.textContent) {
					switch (symbol) {
						case '-':
							addNumber(inputNumber);
							if ((arr.length === 0 && inputNumber === '') || (inputNumber === '' && typeof(arr[arr.length - 1]) != 'number')) {
								inputNumber += symbol;
							} else {
								arr.push(symbol);
							}
							break;
						case '+':
						case '*':
						case '/':
						case '^':
						case '√':
							addNumber(inputNumber);
							arr.push(symbol);
							break;
						default:
						inputNumber += symbol;
					}
				}
				addNumber(inputNumber);

				const doOperation = (operation) => {
				    const index = arr.findIndex(t => t == operation);
				    const arithmeticObject = {
				    	'^': Math.pow(arr[index - 1], arr[index + 1]),
				    	'√': Math.sqrt(arr[index + 1]),
				     	'*': arr[index - 1] * arr[index + 1],
				      	'/': arr[index - 1] / arr[index + 1],
				      	'+': arr[index - 1] + arr[index + 1],
				      	'-': arr[index - 1] - arr[index + 1]
				    };
				    if (operation == '√') {
				    	arr[index] = arithmeticObject[operation];
				    	arr.splice(index + 1, 1);
				    } else {
				    	arr[index - 1] = arithmeticObject[operation];
				    	arr.splice(index, 2);
				    }
				}

				const calc = () => {
					while (arr.length != 1) {
						if (arr.includes('^') || arr.includes('√')) {
							if (arr.findIndex(t => t == '^') > arr.findIndex(t => t == '√')) {
								doOperation('^');
							} else {
								doOperation('√');
							}
						} else 
						if (arr.includes('*') || arr.includes('/')) {
							if (arr.findIndex(t => t == '*') > arr.findIndex(t => t == '/')) {
								doOperation('*');
							} else {
								doOperation('/');
							}
						} else
						if (arr.includes('+') || arr.includes('-')) {
							if (arr.findIndex(t => t == '+') > arr.findIndex(t => t == '-')) {
								doOperation('+');
							} else {
								doOperation('-');
							}
						}
					}
					return arr[0];
				}

				result.textContent = parseFloat(calc().toPrecision(10));
				arr = [];
				break;
			case 'del':
				result.textContent = result.textContent.slice(0, -1);
				break;
			case 'clr':
				result.textContent = '';
				break;
			default:
			result.textContent += this.innerText;
		}
	})
})