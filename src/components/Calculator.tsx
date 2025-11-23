import { useState, useEffect } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  useEffect(() => {
    const bg = localStorage.getItem("selectedBackground");

    if (bg) {
      document.body.style.backgroundImage = `url(${bg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    } else {
      document.body.style.background = "#a3e3ff";
      document.body.style.backgroundImage = "none";
    }

    return () => {
      document.body.style.background = "#a3e3ff";
      document.body.style.backgroundImage = "none";
    };
  }, []);

  // Lógica da calculadora abaixo

  function handleClickNumber(n: string) {
    if (overwrite) {
      setCurrentValue(n);
      setOverwrite(false);
      return;
    }

    setCurrentValue((old) => (old === "0" ? n : old + n));
  }

  function handleOperatorClick(op: string) {
    if (previousValue !== null) {
      handleEqualsClick();
      setOperator(op);
      return;
    }

    setOperator(op);
    setPreviousValue(currentValue);
    setOverwrite(true);
  }

  function handleEqualsClick() {
    if (!operator || previousValue === null) return;

    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = b !== 0 ? a / b : 0;
        break;
    }

    setCurrentValue(String(result));
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  }

  function handleClear() {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
  }

  function handleBackspace() {
    setCurrentValue((v) =>
      v.length <= 1 ? "0" : v.slice(0, v.length - 1)
    );
  }

  function displayValue() {
    if (previousValue && operator) {
      return `${previousValue} ${operator} ${currentValue}`;
    }
    return currentValue;
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
      </div>
    </div>
  );
}