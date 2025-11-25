interface DisplayProps {
  value: string
}

export default function Display({ value }: DisplayProps) {
  return (
    <div className='display'>
      {value}
    </div>
  )
}