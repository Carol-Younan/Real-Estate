import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import bg from "../assets/bg.jpg";
import "./CareerApply.css";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  homeAddress1: string;
  homeAddress2: string;
  nationality: string;
  gender: string;
  militaryStatus: string;
  maritalStatus: string;
  certificateName: string;
  graduationYear: string;
  major: string;
  university: string;
  currentEmployer: string;
  currentPosition: string;
  currentSalary: string;
  yearsOfExperience: string;
  noticePeriod: string;
  extraCertificates: string;
  resume: File | null;
}

interface Message {
  type: "success" | "error" | "";
  text: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    submittedAt: string;
  };
}

function CareerApply() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    contactNumber: "",
    homeAddress1: "",
    homeAddress2: "",
    nationality: "",
    gender: "",
    militaryStatus: "",
    maritalStatus: "",
    certificateName: "",
    graduationYear: "",
    major: "",
    university: "",
    currentEmployer: "",
    currentPosition: "",
    currentSalary: "",
    yearsOfExperience: "",
    noticePeriod: "",
    extraCertificates: "",
    resume: null
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Auto-hide banner after 5 seconds
  useEffect(() => {
    if (message.type === "success" || message.type === "error") {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
        // Don't clear the message immediately, let the animation finish
        setTimeout(() => setMessage({ type: "", text: "" }), 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        resume: file
      }));
      // Hide any existing banner when user interacts with form
      setShowBanner(false);
      setMessage({ type: "", text: "" });
    } else {
      setMessage({ 
        type: "error", 
        text: "Please upload a valid resume file (PDF, DOC, or DOCX)" 
      });
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setShowBanner(false);

    // Create FormData object for file upload
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'resume' && formData[key as keyof FormData]) {
        data.append(key, formData[key as keyof FormData] as string);
      }
    });
    if (formData.resume) {
      data.append('resume', formData.resume);
    }

    try {
      console.log('📤 Sending application...');
      
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: data,
        mode: 'cors'
      });

      console.log('📥 Response status:', response.status);
      
      const result: ApiResponse = await response.json();
      console.log('📊 Response data:', result);

      if (response.ok && result.success) {
        setMessage({ 
          type: "success", 
          text: "Application submitted successfully! We'll contact you soon." 
        });
        
        // Reset form
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          dateOfBirth: "",
          email: "",
          contactNumber: "",
          homeAddress1: "",
          homeAddress2: "",
          nationality: "",
          gender: "",
          militaryStatus: "",
          maritalStatus: "",
          certificateName: "",
          graduationYear: "",
          major: "",
          university: "",
          currentEmployer: "",
          currentPosition: "",
          currentSalary: "",
          yearsOfExperience: "",
          noticePeriod: "",
          extraCertificates: "",
          resume: null
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Failed to submit application. Please try again." 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        type: "error", 
        text: "Network error. Please check your connection and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const closeBanner = () => {
    setShowBanner(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 300);
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

      {/* ===== SUCCESS/ERROR BANNER - APPEARS AT TOP ===== */}
      {showBanner && message.text && (
        <div className={`message-banner ${message.type}`}>
          <div className="banner-content">
            <div className={`banner-icon ${message.type}`}>
              {message.type === "success" ? "✓" : "!"}
            </div>
            <div className="banner-text">
              <strong>
                {message.type === "success" 
                  ? "Application submitted successfully!" 
                  : "Application Error"
                }
              </strong>
              <span>{message.text}</span>
            </div>
            <button 
              className="close-btn"
              onClick={closeBanner}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ===== FORM ===== */}
      <section className="career-apply-form-section">
        <form className="career-apply-form" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input 
                  id="firstName"
                  name="firstName"
                  type="text" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input 
                  id="middleName"
                  name="middleName"
                  type="text" 
                  value={formData.middleName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input 
                  id="lastName"
                  name="lastName"
                  type="text" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input 
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date" 
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select 
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="maritalStatus">Marital Status *</label>
                <select 
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
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
                <label htmlFor="contactNumber">Contact Number *</label>
                <input 
                  id="contactNumber"
                  name="contactNumber"
                  type="tel" 
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="nationality">Nationality *</label>
                <input 
                  id="nationality"
                  name="nationality"
                  type="text" 
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="homeAddress1">Home Address 1 *</label>
              <input 
                id="homeAddress1"
                name="homeAddress1"
                type="text" 
                value={formData.homeAddress1}
                onChange={handleInputChange}
                required 
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="homeAddress2">Address 2</label>
              <input 
                id="homeAddress2"
                name="homeAddress2"
                type="text" 
                value={formData.homeAddress2}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>

          {/* Military Status */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="militaryStatus">Military Status *</label>
              <select 
                id="militaryStatus"
                name="militaryStatus"
                value={formData.militaryStatus}
                onChange={handleInputChange}
                required 
                disabled={loading}
              >
                <option value="">Select Military Status</option>
                <option value="exempted">Exempted</option>
                <option value="completed">Completed</option>
                <option value="postponed">Postponed</option>
                <option value="not-applicable">Not Applicable</option>
              </select>
            </div>
          </div>

          {/* Education Information */}
          <div className="form-section">
            <h3>Education Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="certificateName">Certificate Name *</label>
                <input 
                  id="certificateName"
                  name="certificateName"
                  type="text" 
                  value={formData.certificateName}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="graduationYear">Graduation Year *</label>
                <input 
                  id="graduationYear"
                  name="graduationYear"
                  type="number" 
                  min="1950"
                  max="2030"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="major">Major *</label>
                <input 
                  id="major"
                  name="major"
                  type="text" 
                  value={formData.major}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="university">University *</label>
                <input 
                  id="university"
                  name="university"
                  type="text" 
                  value={formData.university}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>Professional Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="currentEmployer">Current Employer</label>
                <input 
                  id="currentEmployer"
                  name="currentEmployer"
                  type="text" 
                  value={formData.currentEmployer}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentPosition">Current Position</label>
                <input 
                  id="currentPosition"
                  name="currentPosition"
                  type="text" 
                  value={formData.currentPosition}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="currentSalary">Current Salary</label>
                <input 
                  id="currentSalary"
                  name="currentSalary"
                  type="text" 
                  value={formData.currentSalary}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="e.g., 5000 USD"
                />
              </div>

              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience *</label>
                <input 
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number" 
                  min="0"
                  max="50"
                  step="0.5"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="noticePeriod">Notice Period</label>
                <input 
                  id="noticePeriod"
                  name="noticePeriod"
                  type="text" 
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="e.g., 2 weeks, 1 month"
                />
              </div>
            </div>
          </div>

          {/* Extra Certificates */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="extraCertificates">Extra Certificates</label>
              <textarea 
                id="extraCertificates"
                name="extraCertificates"
                value={formData.extraCertificates}
                onChange={handleInputChange}
                disabled={loading}
                rows={3}
                placeholder="List any additional certificates or qualifications..."
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="resume">Upload Resume (PDF, DOC, DOCX - Max 5MB) *</label>
              <input 
                id="resume"
                name="resume"
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange}
                required 
                disabled={loading}
              />
            </div>
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
