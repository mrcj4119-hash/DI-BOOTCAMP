import { useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

function ColumnLeft() {
  const [images, setImages] = useState([])

  const getImages = () => {
    const seed = Date.now()
    setImages([
      `https://picsum.photos/seed/${seed}/300/200`,
      `https://picsum.photos/seed/${seed + 1}/300/200`,
    ])
  }

  return (
    <section className="left-column">
      <h2>Left column</h2>
      <button className="button button-primary" type="button" onClick={getImages}>
        Get images
      </button>
      {images.length > 0 && (
        <div className="image-grid">
          {images.map((image) => (
            <img key={image} src={image} alt="Random landscape" />
          ))}
        </div>
      )}
    </section>
  )
}

function ColumnRight() {
  const [description, setDescription] = useState(
    '{"function":"I live to crash"}',
  )

  const replaceStringWithObject = () => {
    setDescription({ function: 'I live to crash' })
  }

  const invokeEventHandler = () => {
    throw new Error('This error is thrown inside an event handler.')
  }

  return (
    <section className="right-column">
      <h2>Right column</h2>
      <p>
        There are two types of errors we can trigger inside this component: A
        rendering error and a regular javascript error.
      </p>
      <hr />
      <p>
        Clicking this button will replace the <code>stringified</code> object,
        <code> {'{"function":"I live to crash"}'} </code>, with the original
        object. This will result in a rendering error.
      </p>
      <ErrorBoundary>
        <p>{description}</p>
      </ErrorBoundary>
      <button
        className="button button-danger"
        type="button"
        onClick={replaceStringWithObject}
      >
        Replace string with object
      </button>
      <hr />
      <p>
        Clicking this button will invoke an event handler, inside of which an
        error is thrown.
      </p>
      <button
        className="button button-danger"
        type="button"
        onClick={invokeEventHandler}
      >
        Invoke event handler
      </button>
    </section>
  )
}

function App() {
  return (
    <>
      <header className="top-bar">Error boundaries in react</header>
      <main className="columns">
        <ColumnLeft />
        <ColumnRight />
      </main>
    </>
  )
}

export default App
