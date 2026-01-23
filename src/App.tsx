import { useState } from 'react'
import Home from './components/Home'
import About from './components/About'
import Portfolio from './components/Portfolio'
import './App.css'

function App() {
  const [tab, setTab] = useState('home')

  return (
    <div className="app-root">
      <main className="container">
        {tab === 'home' && <Home onChange={setTab} />}
        {tab === 'about' && <About onChange={setTab} />}
        {tab === 'portfolio' && <Portfolio onChange={setTab} />}
      </main>
    </div>
  )
}

export default App
