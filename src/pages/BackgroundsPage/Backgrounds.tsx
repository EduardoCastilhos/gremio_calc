import './backgrounds.css'
import { useState } from 'react'

export default function Backgrounds(){

    const [selected, setSelected] = useState(
        localStorage.getItem('selectedBackground') || ''
    )

    const backgrounds = [
        {id: 1, img: '/src/assets/backgrounds/arena.jpg'},
        {id: 2, img: '/src/assets/backgrounds/olimpico.jpg'},
        {id: 3, img: '/src/assets/backgrounds/libertadores17.webp'},
        {id: 4, img: '/src/assets/backgrounds/libertadores95.jpg'},
        {id: 5, img: '/src/assets/backgrounds/mundial83.png'}
    ]

    function handleSelect(bg: string){

        if(selected === bg){
            setSelected('')
            localStorage.removeItem('selectedBackground')
            return
        }

        setSelected(bg)
        localStorage.setItem('selectedBackground', bg)
    }

    return(
        <div className='bg-selected-conteiner'>
            <h1> SELEÇÃO DE BACKGROUND </h1>
            <div className='bg-grid'>
                {backgrounds.map((b)=>(
                    <div 
                        key={b.id} 
                        className={`bg-item ${selected === b.img ? "selected" : ''}`}
                    >
                        <img 
                            src={b.img} 
                            alt='background' 
                            onClick={() => handleSelect(b.img)} 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}