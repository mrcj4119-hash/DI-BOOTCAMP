import { useDispatch, useSelector } from 'react-redux'
import { ageDownAsync, ageUpAsync } from '../features/age/ageSlice.js'

function AgeControls() {
  const dispatch = useDispatch()
  const { age, loading } = useSelector((state) => state.age)

  return (
    <div className="age-controls" aria-label="Age controls">
      <button
        className="control-button control-button-secondary"
        type="button"
        onClick={() => dispatch(ageDownAsync())}
        disabled={loading || age === 0}
      >
        <span aria-hidden="true">−</span>
        Age Down
      </button>
      <button
        className="control-button control-button-primary"
        type="button"
        onClick={() => dispatch(ageUpAsync())}
        disabled={loading}
      >
        <span aria-hidden="true">+</span>
        Age Up
      </button>
    </div>
  )
}

export default AgeControls
