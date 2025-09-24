import Img from './assets/2.jpg';
import './Career.css';

export default function Careers() {
  return (
    
    <section
      style={{
        position:"relative",
        height:"500px",
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 50px"
      }}
    >
      <div className='the-overlay-card'
        style={{
          height:"auto",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* عنوان رئيسي */}
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "#2B84BE",
            marginBottom: "20px",
          }}
        >
          Build Your Career With Us
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#828282ff",
            marginBottom: "50px",
          }}
        >
          Join RSC and be part of shaping Egypt’s future infrastructure and
          construction projects.
        </p>

        {/* كروت الوظائف */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
              <button
                style={{
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, #3498db, #2980b9)",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width:"150px",
                  margin:"auto",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #2980b9, #1f5f99)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #3498db, #2980b9)";
                }}
              >
                Apply Now
              </button>
        </div>
      </div>
    </section>
  );
}
