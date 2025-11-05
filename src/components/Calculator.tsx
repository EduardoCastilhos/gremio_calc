import React, {useState} from 'react'
import Display from './Display'
import Keypad from './Keypad'

function Calculator() {
  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue] = useState<String | null>(null)
  const [operator, setOperator] = useState<String | null>(null)
  const [overwrite, setOverwrite] = useState(false)
}