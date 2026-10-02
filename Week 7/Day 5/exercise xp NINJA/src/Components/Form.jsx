import { useState } from 'react'
import Input from './Input.jsx'

const emptyValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^\+?[\d\s().-]+$/

function validateField(name, value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return 'This field is required.'
  }

  if (name === 'email' && !emailPattern.test(trimmedValue)) {
    return 'Enter a valid email address.'
  }

  if (name === 'phone') {
    const digitCount = trimmedValue.replace(/\D/g, '').length
    if (!phonePattern.test(trimmedValue) || digitCount < 7 || digitCount > 15) {
      return 'Enter a valid phone number.'
    }
  }

  return ''
}

function Form() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setSubmitted(false)

    if (Object.hasOwn(errors, name)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value),
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = Object.fromEntries(
      Object.entries(values).map(([name, value]) => [name, validateField(name, value)]),
    )
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  const fields = [
    { id: 'first-name', name: 'firstName', label: 'First name', inputMode: 'text', autoComplete: 'given-name' },
    { id: 'last-name', name: 'lastName', label: 'Last name', inputMode: 'text', autoComplete: 'family-name' },
    { id: 'phone', name: 'phone', label: 'Phone', inputMode: 'tel', autoComplete: 'tel' },
    { id: 'email', name: 'email', label: 'Email', inputMode: 'email', autoComplete: 'email' },
  ]

  return (
    <section className="form-panel" aria-labelledby="form-heading">
      <div className="form-heading">
        <p className="section-kicker">Form validation</p>
        <h2 id="form-heading">Your details</h2>
        <p>All fields are required.</p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="fields-grid">
          {fields.map((field) => (
            <Input
              key={field.name}
              {...field}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>
        <button className="submit-button" type="submit">Validate details <span aria-hidden="true">→</span></button>
      </form>

      {submitted && (
        <div className="success-message" role="status">
          <span className="success-mark" aria-hidden="true">✓</span>
          <div>
            <strong>Details look good, {values.firstName.trim()}.</strong>
            <p>Your contact information passed validation.</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Form