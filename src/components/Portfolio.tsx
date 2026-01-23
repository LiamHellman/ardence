import { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { LuChefHat } from 'react-icons/lu'
import { HiOutlineMenu } from 'react-icons/hi'

const items = new Array(8).fill(0).map((_,i)=>({
  id: i+1,
  src: `/images/${i+1}.jpg`,
}))

interface PortfolioProps {
  onChange: (tab: string) => void
}

export default function Portfolio({ onChange }: PortfolioProps){
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="portfolio">
      <div className="menu-container">
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HiOutlineMenu />
        </button>
        {isMenuOpen && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={() => onChange('home')}><FiHome /></button>
            <button className="dropdown-item" onClick={() => onChange('about')}><LuChefHat /></button>
          </div>
        )}
      </div>
      <div className="grid-4col">
        {items.map(item=> (
          <div className="card-clickable" key={item.id} onClick={() => setSelectedId(item.id)}>
            <img src={item.src} alt="Event" />
          </div>
        ))}
      </div>

      {selectedId && (
        <div className="modal" onClick={() => setSelectedId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedId(null)}>×</button>
            <img src={`/images/${selectedId}.jpg`} alt="Event" />
          </div>
        </div>
      )}
    </section>
  )
}
