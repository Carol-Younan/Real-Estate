import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Projects.css";
import bg from "../assets/bg.jpg";
import CONFIG from "../Config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface Project {
  id: number;
  name: string;
  info: string;
  images: string[];        
  location?: string;
  category: string;
}

const LocationIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

function ProjectsOfCat() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CONFIG.PROJECTS_URL)
      .then((res) => res.json())
      .then((data) => {
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

  return (
    <div>
      {/* Hero Section */}
      <div
        className="projects-hero"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="projects-hero-title">
          <h1>{categoryName || "All Projects"}</h1>
          <p style={{ color: "#0047AB" }}>
            Discover our exceptional construction projects
          </p>
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
                  {/* ✅ Swiper Slider */}
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={1}
                    loop
                    className="projects-swiper"   
                  >
                    {project.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={`${project.name}-${i}`}
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="project-image-overlay"></div>
                </div>

                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-info">{project.info}</p>
                  
                  {/* ✅ Location مع الأيقونة */}
                  {project.location && (
                    <div className="project-location">
                      <LocationIcon />
                      <span>{project.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsOfCat;