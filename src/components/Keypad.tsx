import Button from './Button'
import { FaVolumeUp } from 'react-icons/fa'

interface KeypadProps {
  onNumberClick: (num: string) => void
  onOperatorClick: (op: string) => void
  onEqualsClick: () => void
  onClear: () => void
  onBackspace: () => void
}

export default function Keypad({
  onNumberClick,
  onOperatorClick,
  onEqualsClick,
  onClear,
  onBackspace,
}: KeypadProps) {
  return (
    <div className='keypad'>

      {/* Primeira linha */}
      <Button label='C' onClick={onClear} className='button-row-black' />
      <Button label='⌫' onClick={onBackspace} className='button-row-white' />
      <Button label='/' onClick={() => onOperatorClick('/')} className='button-row-black' />
      <Button label='x' onClick={() => onOperatorClick('*')} className='button-row-white' />

      {/* Segunda linha */}
      <Button label='7' onClick={() => onNumberClick('7')} className='button-row-black' />
      <Button label='8' onClick={() => onNumberClick('8')} className='button-row-white' />
      <Button label='9' onClick={() => onNumberClick('9')} className='button-row-black' />
      <Button label='-' onClick={() => onOperatorClick('-')} className='button-row-white' />

      {/* Terceira linha */}
      <Button label='4' onClick={() => onNumberClick('4')} className='button-row-black' />
      <Button label='5' onClick={() => onNumberClick('5')} className='button-row-white' />
      <Button label='6' onClick={() => onNumberClick('6')} className='button-row-black' />
      <Button label='+' onClick={() => onOperatorClick('+')} className='button-row-white' />

      {/* Quarta linha */}
      <Button label='1' onClick={() => onNumberClick('1')} className='button-row-black' />
      <Button label='2' onClick={() => onNumberClick('2')} className='button-row-white' />
      <Button label='3' onClick={() => onNumberClick('3')} className='button-row-black' />
      <Button label={<FaVolumeUp />} onClick={() => {}} className='button-row-white' />

      {/* Quinta linha */}
      <Button label='0' onClick={() => onNumberClick('0')} className='button-double button-row-white' />
      <Button label='=' onClick={onEqualsClick} className='button-double button-row-black' />

    </div>
  )
}