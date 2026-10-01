import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './App.css'

const destinations = [
  {
    name: 'Hong Kong',
    country: 'China',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg',
    number: '01',
  },
  {
    name: 'Macao',
    country: 'China',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp',
    number: '02',
  },
  {
    name: 'Japan',
    country: 'East Asia',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp',
    number: '03',
  },
  {
    name: 'Las Vegas',
    country: 'United States',
    image: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp',
    number: '04',
  },
]

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Destination home">elsewhere<span>.</span></a>
        <span className="topbar-note">A short list for your next long weekend</span>
        <a className="topbar-link" href="#destinations">Explore <span aria-hidden="true">↘</span></a>
      </header>

      <section className="intro" id="home">
        <p className="eyebrow">Four places, countless ways to go</p>
        <h1>Somewhere<br />worth going.</h1>
        <p className="intro-copy">Big city lights, quiet temples, new streets to learn by heart. Pick a place and start wandering.</p>
      </section>

      <section className="carousel-section" id="destinations" aria-label="Featured destinations">
        <div className="carousel-label">
          <span>Destination notes</span>
          <span>01 — 04</span>
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators
          showArrows
          infiniteLoop
          swipeable
          emulateTouch
          useKeyboardArrows
          ariaLabel="Destination carousel"
        >
          {destinations.map((destination) => (
            <article className="destination-slide" key={destination.name}>
              <img src={destination.image} alt={`${destination.name} travel destination`} />
              <div className="slide-shade" />
              <div className="slide-copy">
                <p>{destination.number} <span>/</span> {destination.country}</p>
                <h2>{destination.name}</h2>
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      <footer className="page-footer">
        <span>Make room for somewhere new.</span>
        <span>Destination guide · 2026</span>
      </footer>
    </main>
  )
}

export default App