import React, { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { LuChefHat } from 'react-icons/lu'

const items = new Array(8).fill(0).map((_,i)=>({
  id: i+1,
  src: `/ardence/images/${i+1}.jpg`,
}))

interface PortfolioProps {
  onChange: (tab: string) => void
}

export default function Portfolio({ onChange }: PortfolioProps){
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <section className="portfolio">
      <button className="back-btn home-btn" onClick={() => onChange('home')}><FiHome /></button>
      <button className="back-btn" onClick={() => onChange('about')}><LuChefHat /></button>
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
            <img src={`/ardence/images/${selectedId}.jpg`} alt="Event" />
          </div>
        </div>
      )}
    </section>
  )
}
