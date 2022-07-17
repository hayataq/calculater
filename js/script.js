const numberButtons = document.querySelectorAll('[data-num]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const prevOperandElement = document.querySelector('[data-pre-operand]')
const currOperandElement = document.querySelector('[data-curr-operand]')
const currOperand = 0
const prevOperand = 0




class Calculator {
    constructor(prevOperandElement,currOperandElement){
        this.prevOperandElement = prevOperandElement;
        this.currOperandElement = currOperandElement;
    }
  clear(){
    this.currOperand =''
    this.prevOperand =''
    this.operation = undefined
  }
  delete(){
    this.currOperand =this.currOperand.toString().slice(0,-1)

  }
  appenedNumber(number){
    console.log("appened")
    if((this.number === '.') && this.currOperand.includes('.')) return
    this.currOperand = this.currOperand.toString() + number.toString()

  }
  chooseOperation(operation){
    if(this.currOperand === '')return
    if(this.prevOperand !== ''){
        this.compute()
    }
    this.operation =operation
    this.prevOperand = this.currOperand
    this.currOperand=''


  }

  compute(){
    console.log("compute")
    let computation 
    const prev = parseFloat(this.prevOperand)
    const curr = parseFloat(this.currOperand)
    if(isNaN(prev) || isNaN(curr)) return
    switch(this.operation){
        case '+':
            computation = prev + curr
            console.log("+")
            break;
     
        case '-':
            computation = prev-curr 
            break;

        case '/':
            computation = prev/curr
            break;
            
        case '*' :
            computation = prev*curr   
            break;
        default:
            return      
        
    }
    this.currOperand = computation
    this.operation = undefined
    this.prevOperand = ''

  }

  getDisplayNumber(number){
    const stringNumber =number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay 
    if(isNaN(integerDigits)){
        integerDisplay = ''
    }else{
        integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0 })

    }
    if(decimalDigits != null){
        return `${integerDigits}.${decimalDigits}`
    }else{
        return integerDisplay
    }


  }

  updateDisplay(){
    console.log("update")
    this.currOperandElement.innerText = this.getDisplayNumber( this.currOperand)
    if(this.operation != null){
    this.prevOperandElement.innerText =`${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
     
  }else{
    this.prevOperandElement.innerText = ''
  }
  }
}

const calculator = new Calculator(prevOperandElement,currOperandElement)
 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("button")
        calculator.appenedNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
      
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
   document.getElementById('out').innerHTML="hello sabayaa :)"
    console.log("equal")
    calculator.compute()
    calculator.updateDisplay()
})
clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})







