import React, { useState } from 'react'

interface AboutProps {
  onChange: (tab: string) => void
}

export default function About({ onChange }: AboutProps){
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = [
    { src: '/ardence/service.jpg', name: 'Services' },
    { src: '/ardence/valeurs.jpg', name: 'Values' }
  ]

  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % slides.length)
  }

  return (
    <section className="about">
      <button className="back-btn" onClick={() => onChange('home')}>← Back</button>
      
      <div className="chefs-container">
        <img src="/ardence/mathis.jpg" alt="Mathis Gaudet" className="chef-img" />
        <img src="/ardence/julien.jpg" alt="Julien Ricoul" className="chef-img" />
      </div>
      <div className="frames-row">
        <div className="frame">
          <img src="/ardence/service.jpg" alt="Services" />
        </div>
        <div className="frame">
          <img src="/ardence/valeurs.jpg" alt="Values" />
        </div>
      </div>
    </section>
  )
}
