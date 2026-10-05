import { useState } from 'react'
import './App.css'

const initialFormData = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  destination: '',
  lactoseFree: false,
}

function FormComponent({ formData, handleChange }) {
  return (
    <form method="get" className="travel-form">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        aria-label="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        aria-label="Last Name"
        required
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        min="1"
        placeholder="Age"
        aria-label="Age"
        required
      />

      <div className="gender-options">
        <label className="choice">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
            required
          />
          Male
        </label>
        <label className="choice">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>

      <label className="destination-field">
        Select your destination
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            -- Please Choose a destination --
          </option>
          <option value="Japan">Japan</option>
          <option value="Brazil">Brazil</option>
          <option value="Norway">Norway</option>
        </select>
      </label>

      <fieldset className="dietary-options">
        <legend>Dietary restrictions:</legend>
        <label className="choice">
          <input
            type="checkbox"
            name="lactoseFree"
            checked={formData.lactoseFree}
            onChange={handleChange}
          />
          Lactose free
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <main className="page">
      <h1>Sample form</h1>
      <FormComponent formData={formData} handleChange={handleChange} />

      <section className="submitted-data" aria-live="polite">
        <h2>Entered information:</h2>
        <p>
          <em>Your name:</em> {formData.firstName} {formData.lastName}
        </p>
        <p><em>Your age:</em> {formData.age}</p>
        <p><em>Your gender:</em> {formData.gender}</p>
        <p><em>Your destination:</em> {formData.destination}</p>
        <p>
          <em>Your dietary restrictions:</em>
          <span>**Lactose free : {formData.lactoseFree ? 'Yes' : 'No'}</span>
        </p>
      </section>
    </main>
  )
}

export default App
