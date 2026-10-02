import { useState } from 'react'
import Garage from './Garage.jsx'

function Car({ carInfo }) {
  const [color] = useState('red')

  return (
    <div className="component-demo">
      <h3>This car is {color} {carInfo.model}</h3>
      <p className="muted-copy">Make: {carInfo.name}</p>
      <Garage size="small" />
    </div>
  )
}

export default Car