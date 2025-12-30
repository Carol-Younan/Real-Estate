import { useState, useEffect, useRef } from 'react';
import bg from '../assets/bg.jpg';
import './Career.css';
import CONFIG from '../Config';
import { useNavigate } from 'react-router-dom';

interface VacancyData {
  position: string;
  vacancies: number;
  title: string;
  locations: string[];
  status: "Active" | "Inactive";
  description?: string;
  responsibilities?: string[];
}

function Career() {
  const [jobs, setjobs] = useState<VacancyData[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate(); 
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch(CONFIG.JOBS_URL) 
      .then((res) => res.json())
      .then((data) => setjobs(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedIndex !== null) {
        const clickedInsideCard = cardRefs.current[expandedIndex]?.contains(event.target as Node);
        if (!clickedInsideCard) {
          setExpandedIndex(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedIndex]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='CareerPage'>
      <div className='CareerHead'>
        <img src={bg} alt="Career Background" />
        <div className="career-hero-title">
          <h1>Career</h1>
          <p className="subtitle">Join our team of excellence</p>
        </div>
      </div>

      <div className='CareerContent'>
        <h4>Why to join us?</h4>
        <p>
          Joining Real Estate Construction and Development means more than working for one of Egypt's
          largest engineering and construction Company. We've built our business on a passion for
          excellence. We have a flexible approach in all that we do and believe that our employees
          can only put the client first by collaborating with one another.
        </p>
      </div>

      <div className="jobs-container">
        {jobs.map((job, index) => {
          const isExpanded = expandedIndex === index;
          const isDimmed = expandedIndex !== null && expandedIndex !== index;
          
          return (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="job-card"
              style={{
                borderRadius: "16px",
                overflow: isExpanded ? "visible" : "hidden",
                background: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                cursor: "pointer",
                padding: "16px",
                transition: "all 0.3s ease",
                opacity: isDimmed ? 0.3 : 1,
                transform: isExpanded ? "scale(1.05)" : "scale(1)",
                height: isExpanded ? "auto" : "300px", 
                zIndex: isExpanded ? 6 : 1
              }}
            >
              <h3 style={{ 
                color: "#0047AB", 
                margin: "0 0 10px",
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)"
              }}>
                {job.position}
              </h3>
              <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
                <strong>Title:</strong> {job.title}
              </p>
              <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
                <strong>Locations:</strong> {job.locations.join(", ")}
              </p>
              <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
                <strong>Status:</strong> {job.status}
              </p>
              <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
                <strong>Vacancies:</strong> {job.vacancies}
              </p>
              
              {isExpanded && (
                <div style={{ 
                  marginTop: "12px", 
                  marginBottom: "50px",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)"
                }}>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Responsibilities:</strong></p>
                  <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                    {job.responsibilities?.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                className='details-button'
                onClick={() => toggleExpand(index)}
                style={{
                  background: "#0047AB",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#003380";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0047AB";
                }}
              >
                {isExpanded ? "Hide Details" : "Show Details"}
              </button>
              
              <button 
                className='Apply-button'
                style={{
                  background: "#0047AB",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#003380";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0047AB";
                }}
                onClick={() => navigate("/career/apply")}
              >
                Apply
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Career;