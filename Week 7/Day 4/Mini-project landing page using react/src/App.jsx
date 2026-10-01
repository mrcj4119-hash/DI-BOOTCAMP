import Header from './components/Header.jsx'
import FeatureCard from './components/FeatureCard.jsx'
import Contact from './components/Contact.jsx'
import { faBuilding, faEarthAmericas, faLandmark } from '@fortawesome/free-solid-svg-icons'

const features = [
  {
    icon: faBuilding,
    number: '01',
    title: 'About the company',
    text: 'We bring curious people and practical thinking together to help ambitious ideas become lasting work.',
  },
  {
    icon: faEarthAmericas,
    number: '02',
    title: 'Our values',
    text: 'We believe in doing thoughtful work, keeping our promises, and making progress that benefits everyone involved.',
  },
  {
    icon: faLandmark,
    number: '03',
    title: 'Our mission',
    text: 'Our mission is to make complex challenges feel clear, collaborative, and possible to move forward.',
  },
]

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="features-section" id="about" aria-label="About the company">
          <div className="container py-5 py-lg-6">
            <div className="section-intro mb-4 mb-lg-5">
              <p className="eyebrow">A little about us</p>
              <h2>Good work starts with<br className="d-none d-md-block" /> a clear purpose.</h2>
            </div>
            <div className="row g-4">
              {features.map((feature) => (
                <div className="col-12 col-md-6 col-lg-4" key={feature.number}>
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span>Company</span>
          <span>Thoughtful work. Lasting impact.</span>
        </div>
      </footer>
    </>
  )
}

export default App