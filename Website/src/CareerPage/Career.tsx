import {useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import './Career.css';
import CONFIG from '../Config';

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


  useEffect(() => {
    fetch(CONFIG.JOBS_URL) 
      .then((res) => res.json())
      .then((data) => setjobs(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

   const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  return (
    <div className='CareerPage'>
      <div className='CareerHead'>
        <img src={bg} alt="Career Background" />
      </div>

      <div className='CareerContent'>
        <h1 className='CareerHeadText'>Career</h1>
        <h4>Why to join us?</h4>
        <p>
          Joining Red Sea Construction and Development means more than working for one of Egypt’s
          largest engineering and construction Company. We’ve built our business on a passion for
          excellence. We have a flexible approach in all that we do and believe that our employees
          can only put the client first by collaborating with one another.
        </p>
      </div>
        <div
          className="jobs-container"
          style={{
            marginBottom:"30px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 350px)",
            justifyContent:"center",   
            gap: "60px",
            padding: "20px",
          }}
        >
        {jobs.map((job, index) => {

          const isExpanded = expandedIndex === index;
        const isDimmed = expandedIndex !== null && expandedIndex !== index;
        return(
       <div
            key={index}
            className="job-card"
            style={{
              borderRadius: "16px",
              overflow: isExpanded ? "visible" : "hidden",
              background: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              cursor: "pointer",
              padding: "16px",
              width:"350px",
              transition: "all 0.3s ease",
              opacity: isDimmed ? 0.3 : 1,
              transform: isExpanded ? "scale(1.05)" : "scale(1)",
              height: isExpanded ? "auto" : "300px", 
              zIndex: isExpanded ? 6 : 1
            }}
          >
      <h3 style={{ color: "#0047AB", margin: "0 0 10px" }}>{job.position}</h3>
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Locations:</strong> {job.locations.join(", ")}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Vacancies:</strong> {job.vacancies}</p>
            {isExpanded && (
              <div style={{ marginTop: "12px" , marginBottom:"50px" }}>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Responsibilities:</strong></p>
                <ul>
                  {job.responsibilities?.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            <button className='details-button'
              onClick={() => toggleExpand(index)}
              style={{
                marginTop: "10px",
                background: "#0047AB",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {isExpanded ? "Hide Details" : "Show Details"}
            </button>
            <button className='Apply-button'
              style={{
                marginTop: "10px",
                background: "#0047AB",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}>Apply</button>
         </div>
          );
        })}
      </div>
    </div>
  );
}

export default Career;
