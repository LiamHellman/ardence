import { useState } from 'react'
import { PiBowlFood } from 'react-icons/pi'
import { LuChefHat } from 'react-icons/lu'
import { HiOutlineMenu } from 'react-icons/hi'

interface HomeProps {
  onChange: (tab: string) => void
}

export default function Home({ onChange }: HomeProps){
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section 
      className="home full-screen"
      style={{ backgroundImage: 'url(/logo.jpg)' }}
    >
      <div className="menu-container">
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HiOutlineMenu />
        </button>
        {isMenuOpen && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={() => onChange('about')}><LuChefHat /></button>
            <button className="dropdown-item" onClick={() => onChange('portfolio')}><PiBowlFood /></button>
          </div>
        )}
      </div>
    </section>
  )
}
