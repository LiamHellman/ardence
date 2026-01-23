import { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { PiBowlFood } from 'react-icons/pi'
import { HiOutlineMenu } from 'react-icons/hi'

interface AboutProps {
  onChange: (tab: string) => void
}

export default function About({ onChange }: AboutProps){
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="about">
      <div className="menu-container">
        {!isMenuOpen ? (
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
            <HiOutlineMenu />
          </button>
        ) : (
          <div className="dropdown">
            <button className="dropdown-item" onClick={() => onChange('home')}><FiHome /></button>
            <button className="dropdown-item" onClick={() => onChange('portfolio')}><PiBowlFood /></button>
          </div>
        )}
      </div>
      
      <div className="chefs-container">
        <img src="/mathis.jpg" alt="Mathis Gaudet" className="chef-img" />
        <img src="/julien.jpg" alt="Julien Ricoul" className="chef-img" />
      </div>
      <div className="frames-row">
        <div className="frame" style={{ backgroundImage: 'url(/service.jpg)' }}></div>
        <div className="frame" style={{ backgroundImage: 'url(/valeurs.jpg)' }}></div>
      </div>
    </section>
  )
}
