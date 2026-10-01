import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBuilding } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg site-nav">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <span className="brand-mark"><FontAwesomeIcon icon={faBuilding} /></span>
            Company
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#company-navigation"
            aria-controls="company-navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="company-navigation">
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <a className="nav-link" href="#about">About</a>
              <a className="nav-link" href="#values">Values</a>
              <a className="nav-link" href="#mission">Mission</a>
              <a className="nav-link nav-contact-link" href="#contact">Contact us</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="hero-kicker">Independent thinking. Shared progress.</p>
          <h1>Company</h1>
          <p className="hero-subtitle">We specialise in making good ideas matter.</p>
          <a className="hero-link" href="#about">
            Get to know us <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        <span className="hero-index" aria-hidden="true">01 / 03</span>
      </header>
    </>
  )
}

export default Header