import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Projects.css';
import bg from '../assets/bg.jpg';
import CONFIG from '../Config';
import { colors } from '@mui/material';

interface Project {
  id: number;
  name: string;
  info: string;
  image: string;
  location?: string;
  category: string;
}
function ProjectsOfCat(){
     const { categoryName } = useParams<{ categoryName: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from JSON file
    fetch(CONFIG.PROJECTS_URL)
      .then((res) => res.json())
      .then((data) => {
        // Filter projects by category
        const filteredProjects = categoryName
          ? data.filter((project: Project) => 
              project.category.toLowerCase() === categoryName.toLowerCase()
            )
          : data;
        setProjects(filteredProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
return(
    <div>
      {/* Hero Section */}
      <div className="projects-hero" style={{ backgroundImage: `url(${bg})` }}>
        <div className="projects-hero-title">
          <h1>{categoryName || 'All Projects'}</h1>
          <p style={{color: "#0047AB"}}>Discover our exceptional construction projects</p>
        </div> 
      </div>

      {/* Projects Grid */}
      <div className="projects-container">
        {projects.length === 0 ? (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>There are currently no projects in this category.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="project-image"
                  />
                  <div className="project-image-overlay"></div>
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-info">{project.info}</p>
                  {project.location && (
                    <div className="project-location">{project.location}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
)
}
export default ProjectsOfCat;