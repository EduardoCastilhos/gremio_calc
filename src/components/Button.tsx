interface ButtonProps {
  label: React.ReactNode
  onClick: (value: string) => void
  className?: string
}

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button className={className} onClick={() => onClick(String(label))}>
      {label}
    </button>
  );
}