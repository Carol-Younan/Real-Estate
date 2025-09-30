import { useState, type FormEvent, type ChangeEvent } from "react";
import bg from "../assets/bg.jpg";
import "./CareerApply.css";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cv: File | null;
}

interface Message {
  type: "success" | "error" | "";
  text: string;
}

function CareerApply() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    cv: null
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    // Validate file type
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (file && allowedTypes.includes(file.type)) {
      setFormData(prev => ({
        ...prev,
        cv: file
      }));
      setMessage({ type: "", text: "" });
    } else {
      setMessage({ 
        type: "error", 
        text: "Please upload a valid CV file (PDF, DOC, or DOCX)" 
      });
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ type: "", text: "" });

  const data = new FormData();
  data.append('fullName', formData.fullName);
  data.append('email', formData.email);
  data.append('phone', formData.phone);
  if (formData.cv) {
    data.append('cv', formData.cv);
  }

  try {
    console.log('📤 Sending application...');
    
    const response = await fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      body: data
    });

    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('📊 Response data:', result);
    
    if (result.success) {
      setMessage({ 
        type: "success", 
        text: "Application submitted successfully! We'll contact you soon." 
      });
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cv: null
      });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ 
        type: "error", 
        text: result.message || "Failed to submit application." 
      });
    }
  } catch (error) {
    console.error('🚨 Fetch error:', error);
    setMessage({ 
      type: "error", 
      text: "Network error. Please check your connection and try again." 
    });
  } finally {
    setLoading(false);
  }
};

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
        <form className="career-apply-form" onSubmit={handleSubmit}>
          {/* Success/Error Message */}
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName"
              name="fullName"
              type="text" 
              value={formData.fullName}
              onChange={handleInputChange}
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cv">Upload CV (PDF, DOC, DOCX - Max 5MB)</label>
            <input 
              id="cv"
              name="cv"
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange}
              required 
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default CareerApply;