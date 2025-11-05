import Button from './Button'

interface KeypadProps {
  onNumberClick: (num: string) => void
  onOperatorClick: (op: string) => void
  onEqualsClick: () => void
  onClear: () => void
}

function Keypad({
  onNumberClick,
  onOperatorClick,
  onEqualsClick,
  onClear,
}: KeypadProps) {
  const numbers = ["1","2","3","4","5","6","7","8","9","0"]
  const operators = ["+","-","*","/"]

  return(
    <div className='keypad'>
      <div className='numbers'>
        {numbers.map((n) => (
          <Button key={n} label={n} onClick={onNumberClick} />
        ))}
        <Button label='C' onClick={() => onClear()} />
      </div>
      <div className='operators'>
        {operators.map((op) => (
          <Button key={op} label={op} onClick={onOperatorClick} />
        ))}
        <Button label='=' onClick={() => onEqualsClick} />
      </div>
    </div>
  )
}

export default Keypad