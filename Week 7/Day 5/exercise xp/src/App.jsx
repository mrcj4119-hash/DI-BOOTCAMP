import Car from './Components/Car.jsx'
import Color from './Components/Color.jsx'
import Events from './Components/Events.jsx'
import Phone from './Components/Phone.jsx'
import './App.css'

const carinfo = { name: 'Ford', model: 'Mustang' }

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Week 7 · Day 5</p>
        <h1>React Exercise XP</h1>
        <p className="intro-copy">Components, state, events, and effects in action.</p>
      </header>

      <section className="exercise-section" aria-labelledby="car-heading">
        <div className="section-heading">
          <span className="section-number">01</span>
          <h2 id="car-heading">Cars & components</h2>
        </div>
        <div className="demo-panel">
          <Car carInfo={carinfo} />
        </div>
      </section>

      <section className="exercise-section" aria-labelledby="events-heading">
        <div className="section-heading">
          <span className="section-number">02</span>
          <h2 id="events-heading">Event handlers</h2>
        </div>
        <div className="demo-panel">
          <Events />
        </div>
      </section>

      <section className="exercise-section" aria-labelledby="phone-heading">
        <div className="section-heading">
          <span className="section-number">03</span>
          <h2 id="phone-heading">Phone state</h2>
        </div>
        <div className="demo-panel">
          <Phone />
        </div>
      </section>

      <section className="exercise-section" aria-labelledby="color-heading">
        <div className="section-heading">
          <span className="section-number">04</span>
          <h2 id="color-heading">The useEffect hook</h2>
        </div>
        <div className="demo-panel">
          <Color />
        </div>
      </section>
    </main>
  )
}

export default App