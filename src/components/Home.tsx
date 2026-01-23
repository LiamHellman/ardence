import React from 'react'
import { PiBowlFood } from 'react-icons/pi'
import { LuChefHat } from 'react-icons/lu'

interface HomeProps {
  onChange: (tab: string) => void
}

export default function Home({ onChange }: HomeProps){
  return (
    <section 
      className="home full-screen"
      style={{ backgroundImage: 'url(/ardence/logo.jpg)' }}
    >
      <div className="top-buttons">
        <button className="top-btn btn-about" onClick={() => onChange('about')}><LuChefHat /></button>
        <button className="top-btn btn-portfolio" onClick={() => onChange('portfolio')}><PiBowlFood /></button>
      </div>
    </section>
  )
}
