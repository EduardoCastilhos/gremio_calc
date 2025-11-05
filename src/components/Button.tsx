interface ButtonProps {
  label: string
  onClick: (label: string) => void
}

function Button({label, onClick}: ButtonProps) {
  return(
    <button className="button" onClick={() => onClick(label)}>
      {label}
    </button>
  )
}

export default Button