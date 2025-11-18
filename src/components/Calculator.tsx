import { useState, useEffect } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  // ─ DIGITAR NÚMEROS / DECIMAL
  const handleClickNumber = (num: string) => {
    if (num === "," || num === ".") {
      if (currentValue.includes(".")) return;
      num = ".";
    }

    if (overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
      return;
    }

    setCurrentValue((prev) => (prev === "0" ? num : prev + num));
  };

  // ─ DEFINIR OPERADOR
  const handleOperatorClick = (op: string) => {
    if (operator && !overwrite) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setOverwrite(true);
  };

  // ─ CALCULAR RESULTADO
  const calculate = (): string => {
    if (!operator || previousValue === null) return currentValue;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+": result = prev + curr; break;
      case "-": result = prev - curr; break;
      case "*": result = prev * curr; break;
      case "/": result = curr !== 0 ? prev / curr : NaN; break;
      default: return currentValue;
    }

    return String(result);
  };

  // ─ BOTÃO "="
  const handleEqualsClick = () => {
    if (!operator || previousValue === null) return;

    const result = calculate();
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  // ─ LIMPAR
  const handleClear = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(false);
  };

  // ─ BACKSPACE
  const handleBackspace = () => {
    setCurrentValue((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : "0"
    );
  };

  // ─ SUPORTE AO TECLADO / NUMPAD
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      const key = e.key;

      if (!isNaN(Number(key))) handleClickNumber(key);
      else if (key === "." || key === ",") handleClickNumber(key);
      else if (["+", "-", "*", "/"].includes(key)) handleOperatorClick(key);
      else if (key === "Enter" || key === "=") { e.preventDefault(); handleEqualsClick(); }
      else if (key.toLowerCase() === "c") handleClear();
      else if (key === "Backspace") handleBackspace();
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentValue, previousValue, operator]);

  // ─ DISPLAY
  const displayValue = () => {
    let text = previousValue ? previousValue : "";
    if (operator) text += ` ${operator} `;
    text += currentValue;
    return text.replace(".", ",");
  };

  return (
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
  );
}

export default Calculator;