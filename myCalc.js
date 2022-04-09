class Calculator {
    constructor(preText, curText) {
        this.preText = preText;
        this.curText = curText;
        this.clear()
    }

    clear(){
        this.curOperand = "";
        this.preOperand = "";
        this.operation = "";
    }

    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }

    appendNumbers(number){
        if (number === "." && this.curOperand.includes(".")) return
        this.curOperand = this.curOperand.toString() + number.toString();

    }

    appendOperands(operation) {
        if (this.curOperand === '') return

        if (this.preOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.preOperand = this.curOperand; 
        this.curOperand = "";

    }

    compute(){
        let result 
        const prev = parseFloat(this.preOperand)
        const current = parseFloat(this.curOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case "+" :
                result = prev + current
                break;
            case "-" :
                result = prev - current
                break;
            case "*" :
                result = prev * current
                break;
            case "/" :
                result = prev / current
                break
            default:
                return
        }
        this.curOperand = result;
        this.operation= "";
        this.preOperand = '';
    }

    getDisplay(num){
        const strungNum = num.toString();
        const integerNum = parseFloat(strungNum.split('.')[0]);
        const decimalDigits = strungNum.split('.')[1];
        let integerDisplay 
        if (isNaN(integerNum)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerNum.toLocaleString('en', {
                maximumFractionDigits:0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }

    display(){
        this.curText.innerText = this.getDisplay(this.curOperand);
        // this.preText.innerText = this.preOperand;
        if(this.preOperand != null) {
        this.preText.innerText = `${this.getDisplay(this.preOperand)} ${this.operation}`;
        }
    }

};


const num = document.querySelectorAll(".num");
const opera = document.querySelectorAll(".operand");
const preText = document.querySelector(".pre");
const curText = document.querySelector(".cur");
const ac = document.querySelector(".ac");
const del = document.querySelector(".del");
const equal = document.querySelector(".equalto");;

const rate = new Calculator(preText, curText);
num.forEach(btn => {
    btn.addEventListener("click", () => {
        rate.appendNumbers(btn.innerText)
        rate.display();
    })
    
});
opera.forEach(btn => {
    btn.addEventListener("click", () => {
        rate.appendOperands(btn.innerText)
        rate.display();
    })
    
});

equal.addEventListener("click", () => {
    rate.compute();
    rate.display()
})

ac.addEventListener("click", () => {
    rate.clear();
    rate.display()
})

del.addEventListener("click", () => {
    rate.delete()
    rate.display()
})