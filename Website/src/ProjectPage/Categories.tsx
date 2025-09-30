import './Categories.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../Config';
import Logo from '../assets/red_sea_construction_logo-removebg-preview.png';
import bg from '../assets/bg.jpg';

interface StatData {
  image: string;
  header: string;
}

function Categories() {
  const [stats, setStats] = useState<StatData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(CONFIG.CATEGORIES_URL) 
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const handleCardClick = (categoryName: string) => {
    // Navigate to projects page with category name
    navigate(`/projects/${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      <div className='head-cat' style={{ backgroundImage: `url(${bg})` }}>
        <div className="categories-title">
          <h1>Our Categories</h1>
          <p className="categories-subtitle">Excellence in Every Project</p>
        </div>
      </div>
      
      <div className="cards-grid">
        {stats.map((stat, index) => (
          <div 
            className="card" 
            key={index}
            onClick={() => handleCardClick(stat.header)}
          >
            <div className="card-inner">
              {/* Front Face */}
              <div className="card-front">
                <div
                  className="content"
                  style={{
                    backgroundImage: `url(${stat.image})`,
                  }}
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    className="icon"
                  />
                </div>
              </div>
              
              {/* Back Face */}
              <div className="card-back"></div>
            </div>
            
            {/* Title Below */}
            <p className="card-title">{stat.header}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;