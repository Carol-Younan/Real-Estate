import './Categories.css'
import { useEffect ,useState } from 'react';
import CONFIG from '../Config';
import Logo from '../assets/red_sea_construction_logo-removebg-preview.png';
import bg from '../assets/bg.jpg';

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
  <>
  <div className='head-cat'>
      <img src={bg} className='img-cat'/>
      </div>
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
        <img
          src={Logo}
          alt="Logo"
          className="icon"
          style={{
            width: '60px',
            height: '60px',
            position: 'absolute',
            top: '5%',
            left: '5%'
          }}
        />
      </div>
      <p className="card-title">{stat.header}</p>
    </div>
  ))}
</div>


  </>
);
}

export default Categories;