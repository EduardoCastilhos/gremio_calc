import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './menuInicial.css'

export default function MenuInicial() {
    const navigate = useNavigate()

  // Estado de mute
    const [muted, setMuted] = useState<boolean>(() => {
        return localStorage.getItem('muted') === 'true'
    })

  // Função para alternar o mute
    function toggleMute() {
        setMuted((prev) => {
            const newVal = !prev
            localStorage.setItem('muted', String(newVal))
            return newVal
            }
        )
    }

    useEffect(() => {
        document.querySelectorAll('audio').forEach((a) => {
            (a as HTMLAudioElement).muted = muted
        })
    }, [muted])

    return (
        <div className='menu-container'>
            <img className='logo' src='/src/assets/img/logo.png' alt='logo'/>
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