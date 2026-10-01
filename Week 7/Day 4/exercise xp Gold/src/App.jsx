import BootstrapCard from './BootstrapCard.jsx'

const celebrities = [
  {
    title: 'Bob Dylan',
    imageUrl: 'https://miro.medium.com/max/4800/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Bob_Dylan',
    description:
      'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
  },
  {
    title: 'McCartney',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/d6/Paul_McCartney_in_October_2018.jpg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Paul_McCartney',
    description:
      'Sir James Paul McCartney CH MBE (born 18 June 1942) is an English singer, songwriter, musician, composer, and record and film producer who gained worldwide fame as co-lead vocalist and bassist for the Beatles.',
  },
]

const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune']

function App() {
  return (
    <main className="container py-5">
      <header className="mb-5">
        <p className="text-uppercase text-primary fw-semibold small mb-2">Week 7 · Day 4</p>
        <h1 className="display-5 fw-semibold mb-0">Bootstrap & JSX</h1>
      </header>

      <section className="mb-5" aria-labelledby="celebrities-heading">
        <h2 id="celebrities-heading" className="h3 mb-4">Celebrity Cards</h2>
        <div className="row g-4">
          {celebrities.map((celebrity) => (
            <div className="col-12 col-md-6" key={celebrity.title}>
              <BootstrapCard {...celebrity} />
            </div>
          ))}
        </div>
      </section>

      <section className="planet-section" aria-labelledby="planets-heading">
        <h2 id="planets-heading" className="h3 mb-4">Planets</h2>
        <ul className="list-group">
          {planets.map((planet) => (
            <li className="list-group-item" key={planet}>{planet}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App