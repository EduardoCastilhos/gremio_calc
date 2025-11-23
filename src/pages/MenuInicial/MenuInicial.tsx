import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import './menuInicial.css'

export default function(){
    const navigate = useNavigate()

    const [muted, setMuted] = useState(false)

    function toggleMute(){
        setMuted((prev) => !prev)
    }

    return (
        <div className='menu-container'>
            <img className='logo' src='/src/assets/logo.png' alt='logo'/>
            <h1> CALCULADORA DO GRÊMIO </h1>
            <div className='menu-buttons'>
                <button onClick={() => navigate('/calc')}>CALCULAR</button>
                <button onClick={() => navigate('/backgrounds')}>TELAS DE FUNDO</button>
                <button onClick={() => navigate('/eastereggs')}>EASTER EGGS</button>
            </div>

            <div className='footer'>
                <span>© 2025 - Eduardo Castilhos</span>
                <button className='mute-btn' onClick={toggleMute}>
                    {muted ? "🔇" : "🔊"}
                </button>
            </div>
        </div>
    )
}