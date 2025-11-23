import Button from "./Button";
import { FaVolumeUp } from "react-icons/fa";

interface KeypadProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onEqualsClick: () => void;
  onClear: () => void;
  onBackspace: () => void;
}

export default function Keypad({
  onNumberClick,
  onOperatorClick,
  onEqualsClick,
  onClear,
  onBackspace,
}: KeypadProps) {
  return (
    <div className="keypad">
      {/* Primeira linha */}
      <Button label="C" onClick={onClear} className="button-row-black" />
      <Button label="⌫" onClick={onBackspace} className="button-row-white" />
      <Button label="/" onClick={onOperatorClick} className="button-row-black" />
      <Button label="*" onClick={onOperatorClick} className="button-row-white" />

      {/* Segunda linha */}
      <Button label="7" onClick={onNumberClick} className="button-row-black" />
      <Button label="8" onClick={onNumberClick} className="button-row-white" />
      <Button label="9" onClick={onNumberClick} className="button-row-black" />
      <Button label="-" onClick={onOperatorClick} className="button-row-white" />

      {/* Terceira linha */}
      <Button label="4" onClick={onNumberClick} className="button-row-black" />
      <Button label="5" onClick={onNumberClick} className="button-row-white" />
      <Button label="6" onClick={onNumberClick} className="button-row-black" />
      <Button label="+" onClick={onOperatorClick} className="button-row-white" />

      {/* Quarta linha */}
      <Button label="1" onClick={onNumberClick} className="button-row-black" />
      <Button label="2" onClick={onNumberClick} className="button-row-white" />
      <Button label="3" onClick={onNumberClick} className="button-row-black" />
      {/* Botão de volume acima do = */}
      <Button label={<FaVolumeUp />} onClick={() => {}} className="button-row-white" />

      {/* Quinta linha */}
      <Button label="0" onClick={onNumberClick} className="button-double button-row-white" />
      <Button label="=" onClick={onEqualsClick} className="button-double button-row-black" />
    </div>
  );
}