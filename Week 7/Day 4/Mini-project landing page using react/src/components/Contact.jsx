import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container py-5 py-lg-6">
        <div className="row g-5 mx-0">
          <div className="col-12 col-lg-5 contact-details">
            <p className="eyebrow">Let’s talk</p>
            <h2>Contact us</h2>
            <p className="contact-intro">Have a project in mind? Send us a note and we’ll get back to you within 24 hours.</p>
            <address className="contact-list">
              <a href="https://maps.google.com/?q=Company" target="_blank" rel="noreferrer">
                <span className="contact-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                Company Name
              </a>
              <a href="tel:+256778800900">
                <span className="contact-icon"><FontAwesomeIcon icon={faPhone} /></span>
                +256 778 800 900
              </a>
              <a href="mailto:company@gmail.com">
                <span className="contact-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                company@gmail.com
              </a>
            </address>
          </div>
          <div className="col-12 col-lg-7">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send us a message</h3>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="contact-name">Your name</label>
                  <input className="form-control" id="contact-name" name="name" autoComplete="name" required />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="contact-email">Email address</label>
                  <input className="form-control" id="contact-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="contact-message">How can we help?</label>
                  <textarea className="form-control" id="contact-message" name="message" rows="4" required />
                </div>
                <div className="col-12 d-flex align-items-center flex-wrap gap-3">
                  <button className="btn send-button" type="submit">Send message</button>
                  {submitted && <p className="form-feedback" role="status">Thanks, your message is ready to send.</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact