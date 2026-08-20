import bg from "../assets/bg.jpg"; // نفس الخلفية أو أي صورة تانية
import "./CareerApply.css";

function CareerApply() {
  return (
    <div className="career-apply-page">
      {/* ===== HERO ===== */}
      <header className="career-apply-hero" style={{ backgroundImage: `url(${bg})` }}>
        <div className="career-apply-overlay" />
        <div className="career-apply-content">
          <h1>Apply for a Position</h1>
          <p className="subtitle">Fill out the form below to join our team</p>
        </div>
      </header>

      {/* ===== FORM ===== */}
      <section className="career-apply-form-section">
        <form className="career-apply-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="tel" required />
          </div>

          <div className="form-group">
            <label htmlFor="cv">Upload CV</label>
            <input id="cv" type="file" accept=".pdf,.doc,.docx" required />
          </div>

          <button type="submit" className="submit-btn">Submit Application</button>
        </form>
      </section>
    </div>
  );
}

export default CareerApply;
