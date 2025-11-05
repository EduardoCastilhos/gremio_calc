import React, {useState} from 'react'
import Display from './Display'
import Keypad from './Keypad'

function Calculator() {
  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue] = useState<String | null>(null)
  const [operator, setOperator] = useState<String | null>(null)
  const [overwrite, setOverwrite] = useState(false)

  // Digitar o número

  const handleClickNumber = (num: string) => {
    if(overwrite){
      setCurrentValue(num)
      setOverwrite(false)
      return
    }
    setCurrentValue((prev) => (prev === '0' ? num: prev + num))
  }

  // Definir operador

  const handleOperatorClick = (op: string) => {
    if (operator && !overwrite) {
      const result = calculate()
      setPreviousValue(result)
      setCurrentValue(result)
    }else{
      setPreviousValue(currentValue)
    }
    setOperator(op)
    setOverwrite(true)
  }

  // Executar o calculo

  const calculate = () : string => {
    if(!operator || previousValue === null) return currentValue

    const prev = parseFloat(previousValue)
    const curr = parseFloat(currentValue)
    let result = 0

    switch(operator) {
      case "+": result = prev + curr; break
      case "-": result = prev - curr; break
      case "*": result = prev * curr; break
      case "/": result = curr !==0 ? prev / curr: NaN; break
      default: return currentValue
    }
    return String(result)
  }

  // Igual

  const handleEqualsClick = () => {
    if(!operator || previousValue === null) return
    const result = calculate()
    setCurrentValue(result)
    setPreviousValue(null)
    setOperator(null)
    setOverwrite(true)
  }

  // Limpar o display

  const handleClear = () => {
    setCurrentValue("0")
    setPreviousValue(null)
    setOperator(null)
    setOverwrite(false)
  }

  return(
    <div className="calculator">
      <Display value={currentValue} />
      <Keypad
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onEqualsClick={handleEqualsClick}
        onClear={handleClear}
      />
    </div>
  )
}

export default Calculator