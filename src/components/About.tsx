import { FiHome } from 'react-icons/fi'
import { PiBowlFood } from 'react-icons/pi'

interface AboutProps {
  onChange: (tab: string) => void
}

export default function About({ onChange }: AboutProps){

  return (
    <section className="about">
      <button className="back-btn home-btn" onClick={() => onChange('home')}><FiHome /></button>
      <button className="back-btn" onClick={() => onChange('portfolio')}><PiBowlFood /></button>
      
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
