import React from 'react'

interface HeaderProps {
  active: string
  onChange: (tab: string) => void
}

export default function Header({ active, onChange }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="logo" onClick={() => onChange('home')}>
        <div className="logo-mark">ARDENCE</div>
      </div>
      <nav className="nav">
        <button className={active==='home'? 'tab active':'tab'} onClick={()=>onChange('home')}>Home</button>
        <button className={active==='about'? 'tab active':'tab'} onClick={()=>onChange('about')}>About</button>
        <button className={active==='portfolio'? 'tab active':'tab'} onClick={()=>onChange('portfolio')}>Portfolio</button>
      </nav>
    </header>
  )
}
