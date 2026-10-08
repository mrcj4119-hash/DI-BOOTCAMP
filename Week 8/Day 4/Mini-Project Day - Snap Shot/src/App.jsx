import { useEffect, useState } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import categories from './categories.js'
import './App.css'

const PAGE_SIZE = 30
const API_URL = 'https://commons.wikimedia.org/w/api.php'

function SearchBar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const query = search.trim()
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`)
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </svg>
      <label className="visually-hidden" htmlFor="gallery-search">Search photos</label>
      <input
        id="gallery-search"
        type="search"
        placeholder="Search photos"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/mountain" aria-label="SnapScout home">
        <span className="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <rect x="3" y="3" width="26" height="26" rx="8" />
            <circle cx="16" cy="16" r="5" />
            <circle cx="23" cy="9" r="1.5" />
          </svg>
        </span>
        <span>snap<span className="brand-light">scout</span></span>
      </Link>
      <SearchBar />
      <span className="header-caption">A collection of little moments</span>
    </header>
  )
}

function CategoryNav() {
  return (
    <nav className="category-nav" aria-label="Photo categories">
      {categories.map((category) => (
        <NavLink
          key={category.slug}
          className={({ isActive }) => `category-link${isActive ? ' active' : ''}`}
          to={`/${category.slug}`}
        >
          {category.name}
        </NavLink>
      ))}
    </nav>
  )
}

function PhotoCard({ photo, index }) {
  const image = photo.imageinfo?.[0]
  const imageUrl = image?.thumburl ?? image?.url
  const title = photo.title?.replace(/^File:/, '') ?? 'Photo'

  if (!imageUrl) return null

  return (
    <a
      className="photo-card"
      href={image.descriptionurl}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${title} on Wikimedia Commons`}
      style={{ '--card-index': index % 12 }}
    >
      <img
        src={imageUrl}
        alt={title.replace(/\.[^.]+$/, '').replaceAll('_', ' ')}
        loading="lazy"
      />
      <span className="photo-overlay">
        <span className="photo-title">{title.replaceAll('_', ' ')}</span>
        <span className="photo-source">VIEW PHOTO ↗</span>
      </span>
    </a>
  )
}

function GalleryPage({ query, title, subtitle }) {
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: `${query} filetype:bitmap`,
      gsrnamespace: '6',
      gsrlimit: String(PAGE_SIZE),
      prop: 'imageinfo',
      iiprop: 'url',
      iiurlwidth: '720',
      format: 'json',
      origin: '*',
    })
    if (page > 1) {
      params.set('gsroffset', String((page - 1) * PAGE_SIZE))
    }

    async function loadPhotos() {
      setLoading(true)
      setError('')
      setPhotos([])

      try {
        const response = await fetch(`${API_URL}?${params}`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`The photo service returned an error (${response.status}).`)
        }

        const data = await response.json()
        if (data.error) {
          throw new Error(data.error.info || 'The photo service could not complete the search.')
        }

        const results = Object.values(data.query?.pages ?? {})
          .filter((photo) => photo.imageinfo?.[0]?.thumburl || photo.imageinfo?.[0]?.url)
          .sort((first, second) => first.index - second.index)

        setPhotos(results)
        setHasNext(Boolean(data.continue?.gsroffset))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Photos could not be loaded. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadPhotos()
    return () => controller.abort()
  }, [page, query, retryCount])

  function changePage(nextPage) {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="gallery-main">
      <section className="gallery-intro">
        <div>
          <p className="eyebrow">YOUR DAILY DOSE OF DISCOVERY</p>
          <h1>{title}</h1>
          <p className="gallery-subtitle">{subtitle}</p>
        </div>
        {!loading && !error && photos.length > 0 && (
          <span className="result-count">
            PAGE {String(page).padStart(2, '0')} <span /> {photos.length} PHOTOS
          </span>
        )}
      </section>

      {error ? (
        <div className="message-panel error-panel" role="alert">
          <span className="message-icon" aria-hidden="true">!</span>
          <h2>We couldn’t load these photos</h2>
          <p>{error}</p>
          <button className="retry-button" type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Try again
          </button>
        </div>
      ) : loading ? (
        <div className="photo-grid" aria-label="Loading photos" aria-busy="true">
          {Array.from({ length: 12 }, (_, index) => (
            <div className="photo-skeleton" key={index} />
          ))}
        </div>
      ) : photos.length ? (
        <>
          <section className="photo-grid" aria-label={`${title} photos`}>
            {photos.map((photo, index) => (
              <PhotoCard key={photo.pageid} photo={photo} index={index} />
            ))}
          </section>
          <nav className="pagination" aria-label="Gallery pagination">
            <button
              className="page-button"
              type="button"
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <span className="page-number">PAGE <strong>{String(page).padStart(2, '0')}</strong></span>
            <button
              className="page-button"
              type="button"
              disabled={!hasNext}
              onClick={() => changePage(page + 1)}
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </nav>
        </>
      ) : (
        <div className="message-panel" role="status">
          <span className="message-icon" aria-hidden="true">⌕</span>
          <h2>No photos found just yet</h2>
          <p>Try another search, or pick a collection above to keep exploring.</p>
        </div>
      )}
    </main>
  )
}

function SearchResultsPage() {
  const { term = '' } = useParams()
  const query = term.trim()

  return (
    <GalleryPage
      key={`search:${query}`}
      query={query}
      title={query ? `Search: ${query}` : 'Search photos'}
      subtitle="A few good things, found just for you."
    />
  )
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <CategoryNav />
      <Routes>
        <Route path="/" element={<Navigate to="/mountain" replace />} />
        {categories.map((category) => (
          <Route
            key={category.slug}
            path={`/${category.slug}`}
            element={
              <GalleryPage
                key={category.slug}
                query={category.search}
                title={category.name}
                subtitle="A few good things, found just for you."
              />
            }
          />
        ))}
        <Route path="/search/:term" element={<SearchResultsPage />} />
        <Route path="*" element={<Navigate to="/mountain" replace />} />
      </Routes>
      <footer className="site-footer">
        <span>SNAPSCOUT <span className="footer-dot">●</span> KEEP LOOKING CLOSER</span>
        <span>IMAGES VIA WIKIMEDIA COMMONS</span>
      </footer>
    </div>
  )
}

export default App
