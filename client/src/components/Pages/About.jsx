import React from "react";
import './About.css'; // Create a separate CSS file for styling
import API_BASE_URL from "../../config/api";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the World with Us</h1>
          <p>
            At Wanderlust Travels, we transform every journey into an unforgettable
            experience. From breathtaking landscapes to immersive cultural adventures,
            we make every trip seamless and memorable.
          </p>
          <button onClick={() => window.location.href="/"}>Explore Now</button>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, Wanderlust Travels began with a simple mission: to make
            travel accessible, enjoyable, and safe for everyone. Over the years, we
            have grown into a trusted travel partner, connecting thousands of explorers
            with destinations around the globe.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To empower travelers with personalized experiences, ensuring each journey
              is filled with discovery, comfort, and joy.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To be the world’s most reliable travel platform, inspiring exploration
              and fostering connections across cultures.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="container">
          <h2>Our Core Values</h2>
          <ul>
            <li><strong>Customer First:</strong> Every decision is made with our travelers in mind.</li>
            <li><strong>Integrity:</strong> Transparency and honesty guide our services.</li>
            <li><strong>Innovation:</strong> Leveraging technology to enhance travel experiences.</li>
            <li><strong>Passion:</strong> We love travel and it shows in everything we do.</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Leadership</h2>
        <div className="team-members">
          <div className="member">
            <img src="/images/team1.jpg" alt="Jane Doe" />
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
            <p>
              Jane has over 15 years of experience in the travel industry, with a
              passion for creating memorable experiences.
            </p>
          </div>
          <div className="member">
            <img src="/images/team2.jpg" alt="John Smith" />
            <h3>John Smith</h3>
            <p>Head of Operations</p>
            <p>
              John ensures that every journey runs smoothly, focusing on logistics
              and customer satisfaction.
            </p>
          </div>
          <div className="member">
            <img src="/images/team3.jpg" alt="Sarah Lee" />
            <h3>Sarah Lee</h3>
            <p>Marketing Lead</p>
            <p>
              Sarah drives creative campaigns to inspire travelers and showcase
              unique destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="cta">
        <h2>Start Your Adventure Today</h2>
        <p>
          Join thousands of happy travelers and explore the world with ease.
        </p>
        <button onClick={() => window.location.href="/"}>Plan Your Trip</button>
      </section>

    </div>
  );
};

export default About;
