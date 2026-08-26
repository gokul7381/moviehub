import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="contact-header">

        <p>GET IN TOUCH</p>

        <h1>
          We'd Love To
          <br />
          Hear From You.
        </h1>

        <span>
          Have a question, suggestion or need help with
          your booking? Send us a message.
        </span>

      </section>


      {/* =========================
          CONTACT CONTAINER
      ========================= */}

      <section className="contact-container">

        {/* =========================
            CONTACT INFORMATION
        ========================= */}

        <div className="contact-info">

          <p className="contact-label">
            CONTACT US
          </p>

          <h2>
            Let's Talk
          </h2>

          <p className="contact-description">
            Our team is here to help you with movie bookings,
            theatre information and any questions you may have.
          </p>


          <div className="contact-item">

            <div className="contact-icon">
              📍
            </div>

            <div>
              <span>
                LOCATION
              </span>

              <strong>
                Coimbatore, Tamil Nadu
              </strong>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              📧
            </div>

            <div>
              <span>
                EMAIL
              </span>

              <strong>
                support@moviebooking.com
              </strong>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              📞
            </div>

            <div>
              <span>
                PHONE
              </span>

              <strong>
                +91 98765 43210
              </strong>
            </div>

          </div>

        </div>


        {/* =========================
            CONTACT FORM
        ========================= */}

        <div className="contact-form-card">

          <p className="contact-label">
            SEND A MESSAGE
          </p>

          <h2>
            How Can We Help?
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="contact-form-row">

              <div className="contact-form-group">

                <label htmlFor="name">
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="contact-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="contact-form-group">

              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            <div className="contact-form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />

            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
            </button>

          </form>


          {submitted && (
            <div className="contact-success">
              Message sent successfully!
              <span>
                Thank you for contacting us. We'll get back to you soon.
              </span>
            </div>
          )}

        </div>

      </section>

    </main>
  );
}

export default Contact;