import React from 'react';
import './About.css';


const About: React.FC = () => {
return (
<div className="about-container">
<header className="about-header">
<h1>About Us</h1>
<p className="subtitle">Building excellence for over 25 years</p>
</header>


<section className="about-section fade-in">
<h2>Our History</h2>
<p>
For more than 25 years, the Construction sector of Orascom Development carried
out in-house construction works across all its projects in Egypt and abroad. In
2010, Red Sea Construction was established as a standalone entity to handle
Orascom Development’s construction projects and expand into the open market. With
over 1,500 highly trained staff, Red Sea Construction has delivered landmark
hotels, marinas, real estate, educational institutions, medical centers, golf
courses, ministerial buildings, and major infrastructure projects in Egypt,
Oman, Montenegro, and Morocco.
</p>
</section>


<section className="about-section fade-in">
<h2>Our Values</h2>
<ul className="values-list">
<li>
<strong>Excellence:</strong> We are committed to doing the right thing with
excellence in all activities, always striving for distinction.
</li>
<li>
<strong>Quality:</strong> Our clients are at the heart of our business. We
deliver the highest quality standards, always on time.
</li>
<li>
<strong>Commitment:</strong> We go the extra mile to achieve results, creating
an environment where our employees can grow to their full potential.
</li>
<li>
<strong>Integrity:</strong> We act with honesty, transparency, and fairness
with all stakeholders, adhering to laws, regulations, and ethical practices.
</li>
<li>
<strong>Loyalty & Teamwork:</strong> We succeed as a team, empowering our
people and building on collective strengths.
</li>
</ul>
</section>


<section className="about-section fade-in">
<h2>Vision</h2>
<p>
To share our culture of excellence and perfection with a broader client base,
building on a long history of superior quality. To be recognized as the best-in-
class engineering and construction company for work methods, technology, and
human resource competence.
</p>
</section>


<section className="about-section fade-in">
<h2>Mission</h2>
<p>
To provide our clients with superior levels of quality construction and
engineering services, while maintaining the highest standards of quality,
integrity, honesty, and commitment in our relationships with clients,
subcontractors, and suppliers.
</p>
</section>


<section className="about-section gallery fade-in">
<h2>Gallery</h2>
<p>Take a glimpse into our story through moments we’ve captured along the way.</p>
<div className="gallery-grid">
<img src="https://via.placeholder.com/400x250" alt="Office" />
<img src="https://via.placeholder.com/400x250" alt="Team" />
</div>
</section>
</div>
);
}


export default About;