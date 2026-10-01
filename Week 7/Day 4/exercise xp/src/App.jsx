import './App.css'
import Exercise from './Exercise3.jsx'
import UserFavoriteAnimals from './UserFavoriteAnimals.jsx'

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
}

function App() {
  const myelement = <h1>I Love JSX!</h1>
  const sum = 5 + 5

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Week 7 · Day 4</p>
        <h1>React Exercise XP</h1>
      </header>

      <section className="exercise-section" aria-labelledby="exercise-one">
        <div className="section-heading">
          <span className="section-number">01</span>
          <h2 id="exercise-one">Working with JSX</h2>
        </div>
        <div className="jsx-examples">
          <p>Hello World!</p>
          {myelement}
          <p>React is {sum} times better with JSX</p>
        </div>
      </section>

      <section className="exercise-section" aria-labelledby="exercise-two">
        <div className="section-heading">
          <span className="section-number">02</span>
          <h2 id="exercise-two">Objects & Props</h2>
        </div>
        <div className="user-example">
          <div>
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
          </div>
          <UserFavoriteAnimals favAnimals={user.favAnimals} />
        </div>
      </section>

      <section className="exercise-section" aria-labelledby="exercise-three">
        <div className="section-heading">
          <span className="section-number">03</span>
          <h2 id="exercise-three">HTML Tags & Styling</h2>
        </div>
        <Exercise />
      </section>
    </main>
  )
}

export default App