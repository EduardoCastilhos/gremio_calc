import Calculator from './components/Calculator'
import MenuInicial from './pages/MenuInicial/MenuInicial'
import { Routes, Route } from 'react-router-dom'
import Backgrounds from './pages/BackgroundsPage/Backgrounds'
import EasterEggs from './pages/EastereggsPage/EasterEggs'

function App() {
    return(
        <Routes>
            <Route path="/" element={<MenuInicial/>} />
            <Route path="/calc" element={<Calculator/>} />
            <Route path="/backgrounds" element={<Backgrounds/>} />
            <Route path="/eastereggs" element={<EasterEggs/>} />
        </Routes>
    )
}

export default App