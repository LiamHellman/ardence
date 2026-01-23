import React from 'react'

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
        <button className="top-btn btn-about" onClick={() => onChange('about')}>About</button>
        <button className="top-btn btn-portfolio" onClick={() => onChange('portfolio')}>Portfolio</button>
      </div>
    </section>
  )
}
