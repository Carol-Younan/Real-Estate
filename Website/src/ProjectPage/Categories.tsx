import './Categories.css'
import { useEffect ,useState } from 'react';
import CONFIG from '../Config';
import Logo from '../assets/red_sea_construction_logo-removebg-preview.png';

interface StatData {
  image: string;
  header: string;
}


function Categories() {

    const [stats, setStats] = useState<StatData[]>([]);

    useEffect(() => {
    fetch(CONFIG.PROJECTS_URL) 
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

return (
  <div className="cards-grid">
    {stats.map((stat, index) => (
      <div className="card" key={index}>
        <div
          className="content"
          style={{
            backgroundImage: `url(${stat.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <img src={Logo} alt="Logo" className="icon" style={{width: '60px', height: '60px'}} />
          <p className="para">
            {stat.header}
          </p>
        </div>
      </div>
    ))}
  </div>
);
}

export default Categories;