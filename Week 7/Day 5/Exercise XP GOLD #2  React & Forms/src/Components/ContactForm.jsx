import { useState } from 'react'

const emptyContact = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

function ContactForm() {
  const [contact, setContact] = useState(emptyContact)
  const [submittedContact, setSubmittedContact] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setContact((currentContact) => ({ ...currentContact, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedContact({ ...contact })
  }

  const handleReset = () => {
    setContact({ ...emptyContact })
    setSubmittedContact(null)
  }

  return (
    <section className="exercise-panel contact-panel" aria-labelledby="contact-heading">
      <div className="panel-heading">
        <span className="panel-index">02</span>
        <div>
          <p className="panel-kicker">Exercise 2</p>
          <h2 id="contact-heading">Contact details</h2>
        </div>
      </div>

      {submittedContact ? (
        <div className="contact-result" aria-live="polite">
          <div className="result-icon" aria-hidden="true">{submittedContact.firstName.charAt(0).toUpperCase()}</div>
          <p className="result-kicker">Details received</p>
          <h3>{submittedContact.firstName} {submittedContact.lastName}</h3>
          <dl className="contact-summary">
            <div><dt>Phone</dt><dd>{submittedContact.phone}</dd></div>
            <div><dt>Email</dt><dd>{submittedContact.email}</dd></div>
          </dl>
          <button className="reset-button" type="button" onClick={handleReset}>Edit details</button>
        </div>
      ) : (
        <>
          <p className="panel-description">Please provide your information below.</p>
          <form className="form-fields" onSubmit={handleSubmit}>
            <label htmlFor="first-name">First name</label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={contact.firstName}
              onChange={handleChange}
              required
            />

            <label htmlFor="last-name">Last name</label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={contact.lastName}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-phone">Phone number</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              pattern="[+]?[0-9]{7,15}"
              title="Enter a valid phone number."
              value={contact.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={contact.email}
              onChange={handleChange}
              required
            />

            <button className="submit-button" type="submit">Submit details <span aria-hidden="true">↗</span></button>
          </form>
        </>
      )}
    </section>
  )
}

export default ContactForm