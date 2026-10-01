import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FeatureCard({ icon, number, title, text }) {
  const sectionId = number === '02' ? 'values' : number === '03' ? 'mission' : undefined

  return (
    <article className="feature-card" id={sectionId}>
      <div className="feature-card-top">
        <span className="feature-number">{number}</span>
        <span className="feature-icon" aria-hidden="true">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default FeatureCard