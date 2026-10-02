import { useState } from 'react'

function Phone() {
  const [brand] = useState('Samsung')
  const [model] = useState('Galaxy S20')
  const [color, setColor] = useState('black')
  const [year] = useState(2020)

  const changeColor = () => {
    setColor('blue')
  }

  return (
    <div className="component-demo">
      <h3>{brand} {model}</h3>
      <p className="muted-copy">Color: {color} <span className={`color-swatch ${color}`} aria-label={`${color} phone color`} /></p>
      <p className="muted-copy">Year: {year}</p>
      <button className="action-button" type="button" onClick={changeColor}>
        Change color
      </button>
    </div>
  )
}

export default Phone