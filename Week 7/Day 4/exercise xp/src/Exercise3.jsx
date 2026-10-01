import { Component } from 'react'
import './Exercise.css'

class Exercise extends Component {
  render() {
    const style_header = {
      color: 'white',
      backgroundColor: 'DodgerBlue',
      padding: '10px',
      fontFamily: 'Arial',
    }

    return (
      <div className="exercise-content">
        <h1 style={style_header}>This is a heading</h1>
        <p className="para">This is a paragraph with its own stylesheet.</p>
        <a href="https://react.dev/">Learn more about React</a>
        <form className="exercise-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="exercise-name">Name</label>
          <input id="exercise-name" name="name" type="text" />
          <button type="submit">Submit</button>
        </form>
        <img
          className="exercise-image"
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=720&q=80"
          alt="Colorful flowers in a garden"
        />
        <ul>
          <li>Paragraph</li>
          <li>Link</li>
          <li>Form</li>
        </ul>
      </div>
    )
  }
}

export default Exercise