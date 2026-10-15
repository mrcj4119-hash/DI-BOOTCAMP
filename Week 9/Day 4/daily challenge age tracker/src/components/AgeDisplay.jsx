import { useSelector } from 'react-redux'

function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age)

  return (
    <section className="age-display" aria-live="polite" aria-busy={loading}>
      <p className="age-label">YOUR AGE</p>
      {loading ? (
        <div className="loading-state">
          <span className="spinner" aria-hidden="true" />
          <span>Updating your age…</span>
        </div>
      ) : (
        <p className="age-value">
          {age}
          <span>years</span>
        </p>
      )}
    </section>
  )
}

export default AgeDisplay
