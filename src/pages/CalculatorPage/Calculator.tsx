import { useEffect, useState } from 'react'
import Display from '../../components/Display'
import Keypad from '../../components/Keypad'
import './calculator.css'

export default function Calculator() {

  //Operadores e valores

  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [overwrite, setOverwrite] = useState(false)

  // EasterEggs

  const [showToasty, setShowToasty] = useState(false)
  const [showGoalImages, setShowGoalImages] = useState<number>(0)

  // Troca de Background

  useEffect(() => {
    const bg = localStorage.getItem('selectedBackground')

    if (bg) {
      document.body.style.backgroundImage = `url(${bg})`
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundRepeat = 'no-repeat'
    } else {
      document.body.style.background = '#a3e3ff'
      document.body.style.backgroundImage = 'none'
    }

    return () => {
      document.body.style.background = '#a3e3ff'
      document.body.style.backgroundImage = 'none'
    };
  }, []);

  // Uso do teclado

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      const key = e.key;


      // ---------------- NÚMEROS ----------------
      if (!isNaN(Number(key))) {
        handleClickNumber(key)
        return
      }


      // ---------------- OPERADORES ----------------
      if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorClick(key)
        return;
      }


      // ---------------- IGUAL (= ou Enter) ----------------
      if (key === 'Enter' || key === '=') {
        e.preventDefault() // evita submit de formulários
        handleEqualsClick()
        return
      }


      // ---------------- BACKSPACE ----------------
      if (key === 'Backspace') {
        handleBackspace()
        return
      }


      // ---------------- CLEAR (C ou Delete) ----------------
      if (key.toLowerCase() === 'c' || key === 'Delete') {
        handleClear()
        return
      }


      // ---------------- PONTO ----------------
      if (key === '.') {
        if (!currentValue.includes('.')) {
          handleClickNumber('.')
        }
        return
      }
    }


    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentValue, operator, previousValue, overwrite])


  // ---------------------------
  //     FUNÇÕES EASTER EGGS
  // ---------------------------

  function playMusic(src: string) {
    const audio = new Audio(src)
    audio.muted = localStorage.getItem('muted') === 'true'
    audio.play()
  }

  function flashBackground(tempImage: string, duration = 3000) {
    setTimeout(() => {
      const original = localStorage.getItem('selectedBackground')
      document.body.style.backgroundImage = `url(${tempImage})`
      document.body.style.transition = '0.5s'

      setTimeout(() => {
        if (original) {
          document.body.style.backgroundImage = `url(${original})`
        } else {
          document.body.style.backgroundImage = 'none'
        }
      }, duration)
    }, 100)
  }

  function triggerToasty() {
    const audio = new Audio('/src/assets/audios/toasty.mp3')
    audio.muted = localStorage.getItem('muted') === 'true'
    audio.play()

    setShowToasty(true)
    setTimeout(() => {
      setShowToasty(false)
    }, 2000)
  }

  function trigger5x0Effects() {
    // flash do background (5s)
    flashBackground('/src/assets/backgrounds/bg5x0.png', 5000)

    let index = 0
    const interval = setInterval(() => {
      index++
      setShowGoalImages(index)

      if (index === 5) {
        clearInterval(interval);

        setTimeout(() => {
          setShowGoalImages(0)
        }, 2500)
      }
    }, 400)
  }



  function checkEasterEggs(result: number) {
    if (result === 2017) {
      playMusic('/src/assets/audios/easterEggFutParodias.mp3')
      flashBackground('/src/assets/backgrounds/bg2017.png', 4000)
    }

    if (result === 7 || result === 1983) {
      triggerToasty()
    }
  }

  function detect5x0(prev: string | null, curr: string, op: string | null) {
    if (prev === '5' && curr === '0' && op === '*') {
      trigger5x0Effects()
    }
  }

  // ---------------------------
  //     LÓGICA DA CALCULADORA
  // ---------------------------

  function handleClickNumber(n: string) {
    if (overwrite) {
      setCurrentValue(n)
      setOverwrite(false)
      return
    }
    setCurrentValue((old) => (old === "0" ? n : old + n))
  }


  function handleOperatorClick(op: string) {
    
    if (operator && !overwrite) {
      handleEqualsClick()
    }

    setOperator(op)
    setPreviousValue(currentValue)
    setOverwrite(true)
  }


  function handleEqualsClick() {
    if (!operator || previousValue === null || overwrite) return
    detect5x0(previousValue, currentValue, operator)

    const a = parseFloat(previousValue)
    const b = parseFloat(currentValue)
    let result = 0;


    switch (operator) {
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      case '*':
        result = a * b
        break
      case '/':
        result = b !== 0 ? a / b : 0
        break
    }


    setCurrentValue(String(result))
    setPreviousValue(null)
    setOperator(null)
    setOverwrite(true)
    checkEasterEggs(result)
  }


  function handleClear() {
    setCurrentValue('0')
    setPreviousValue(null)
    setOperator(null)
    setOverwrite(false)
  }


  function handleBackspace() {
    setCurrentValue((v) =>
      v.length <= 1 ? '0' : v.slice(0, v.length - 1)
    )
  }


  function displayValue() {
    
    if (previousValue && operator) {

      return overwrite
        ? `${previousValue} ${operator}`
        : `${previousValue} ${operator} ${currentValue}`
    }

    return currentValue
  }


    return (
    <div className="calculator-container">
      <div className="calculator">
        <Display value={displayValue()} />


        <Keypad
          onNumberClick={handleClickNumber}
          onOperatorClick={handleOperatorClick}
          onEqualsClick={handleEqualsClick}
          onClear={handleClear}
          onBackspace={handleBackspace}
        />

        {showGoalImages > 0 && (
          <img
            key={showGoalImages}
            src={`/src/assets/img/goal${showGoalImages}.png`}
            className='goal-image'
            alt='Goal!'
          />
        )}

        {showToasty && (
          <img
            src='/src/assets/img/renatoToasty.png'
            className='toasty'
            alt='Toasty!'
          />
        )}

      </div>
    </div>
  )
}