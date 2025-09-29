import React from "react";
import "./About.css";
import heroImg from "../assets/Career2.jpg";
import historyImg from "../assets/history.jpg";

const About: React.FC = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="about-title">
          <h1>About Us</h1>
          <p className="subtitle">Building excellence for over 25 years</p>
        </div>
      </div>

      {/* History Section */}
      <section className="about-section fade-in">
        <h2>Our History</h2>
        <div className="about-history-grid">
          <div className="history-text">
            <p>
              For more than 25 years, the Construction sector of Orascom
              Development carried out in-house construction works across all its
              projects in Egypt and abroad. In 2010, Red Sea Construction was
              established as a standalone entity to handle Orascom Development's
              construction projects and expand into the open market.
            </p>
            <p>
              With over 1,500 highly trained staff, Red Sea Construction has
              delivered landmark hotels, marinas, real estate, educational
              institutions, medical centers, golf courses, ministerial
              buildings, and major infrastructure projects in Egypt, Oman,
              Montenegro, and Morocco.
            </p>
          </div>
          <div className="history-image">
            <img src={historyImg} alt="Orascom Development history" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item fade-in">
            <div className="stat-number">25+</div>
            <div className="stat-label">Years of Experience</div>
          </div>
          <div className="stat-item fade-in">
            <div className="stat-number">1,500+</div>
            <div className="stat-label">Trained Staff</div>
          </div>
          <div className="stat-item fade-in">
            <div className="stat-number">4</div>
            <div className="stat-label">Countries</div>
          </div>
        </div>
      </section>

{/* Values Section */}
<section className="about-section fade-in">
  <h2>Our Core Values</h2>
  <p className="section-subtitle">
    The foundation of everything we build
  </p>
  <div className="values-grid">
    {[
      {
        title: "Excellence",
        text: "We are committed to doing the right thing with excellence in all activities, always striving for distinction.",
      },
      {
        title: "Quality",
        text: "Our clients are at the heart of our business. We deliver the highest quality standards, always on time.",
      },
      {
        title: "Commitment",
        text: "We go the extra mile to achieve results, creating an environment where our employees can grow to their full potential.",
      },
      {
        title: "Integrity",
        text: "We act with honesty, transparency, and fairness with all stakeholders, adhering to laws, regulations, and ethical practices.",
      },
      {
        title: "Teamwork",
        text: "We succeed as a team, empowering our people and building on collective strengths.",
      },
    ].map((value, index) => (
      <div key={index} className="value-card">
        <div className="value-card-inner">
          {/* Front Side */}
          <div className="value-card-front">
            <h3>{value.title}</h3>
          </div>
          {/* Back Side */}
          <div className="value-card-back">
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Vision & Mission Section */}
      <section className="about-section fade-in">
        <h2>Our Vision & Mission</h2>
        <div className="vision-mission-grid">
          <div className="vision-card">
            <h3>Vision</h3>
            <p>
              To share our culture of excellence and perfection with a broader
              client base, building on a long history of superior quality. To be
              recognized as the best-in-class engineering and construction
              company for work methods, technology, and human resource
              competence.
            </p>
          </div>
          <div className="mission-card">
            <h3>Mission</h3>
            <p>
              To provide our clients with superior levels of quality
              construction and engineering services, while maintaining the
              highest standards of quality, integrity, honesty, and commitment
              in our relationships with clients, subcontractors, and suppliers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
