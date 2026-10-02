import { useState } from 'react'

function Forms() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(null)
  const [errormessage, setErrormessage] = useState('')
  const [message, setMessage] = useState('Hello! I am learning React forms.')
  const [car, setCar] = useState('Volvo')

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'username') {
      setUsername(value)
      return
    }

    if (value.trim() === '') {
      setAge(null)
      setErrormessage('')
      return
    }

    setAge(value)
    setErrormessage(Number.isFinite(Number(value)) ? '' : 'Age must be a number.')
  }

  const mySubmitHandler = (event) => {
    event.preventDefault()
    alert(username)
  }

  const header = username && age !== null && !errormessage
    ? <h2 className="result-heading">Your name is {username} and your age is {age}.</h2>
    : null

  return (
    <div className="form-layout">
      <section className="form-section" aria-labelledby="profile-heading">
        <div className="section-heading">
          <span className="section-number">01</span>
          <h2 id="profile-heading">Your details</h2>
        </div>

        {header}

        <form className="profile-form" onSubmit={mySubmitHandler}>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            autoComplete="name"
          />

          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="text"
            inputMode="decimal"
            value={age ?? ''}
            onChange={handleChange}
            aria-invalid={Boolean(errormessage)}
            aria-describedby={errormessage ? 'age-error' : undefined}
          />
          {errormessage && <p className="error-message" id="age-error" role="alert">{errormessage}</p>}

          <button className="action-button" type="submit">Submit</button>
        </form>
      </section>

      <section className="form-section" aria-labelledby="textarea-heading">
        <div className="section-heading">
          <span className="section-number">02</span>
          <h2 id="textarea-heading">A message</h2>
        </div>
        <label className="field-label" htmlFor="message">Textarea</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </section>

      <section className="form-section" aria-labelledby="select-heading">
        <div className="section-heading">
          <span className="section-number">03</span>
          <h2 id="select-heading">Choose a car</h2>
        </div>
        <label className="field-label" htmlFor="car">Car brand</label>
        <select id="car" name="car" value={car} onChange={(event) => setCar(event.target.value)}>
          <option value="Volvo">Volvo</option>
          <option value="Saab">Saab</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Audi">Audi</option>
        </select>
        <p className="selection-copy">Selected: {car}</p>
      </section>
    </div>
  )
}

export default Forms