import React, { useState } from "react";
import styles from './Contact.module.css';
import API_BASE_URL from "../../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.contactHero}>
        <h1>Contact Us</h1>
        <p>We’re here to help! Send us a message and we’ll get back to you soon.</p>
      </section>

      <section className={styles.contactFormSection}>
        <div className={styles.formContainer}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            />

            <button type="submit">Send Message</button>
          </form>

          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <p><strong>Email:</strong> info@wanderlusttravels.com</p>
            <p><strong>Phone:</strong> +91 123 456 7890</p>
            <p><strong>Address:</strong> 123 Travel Lane, City, Country</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
