import { Component } from 'react'
import data from './data/data.json'

class Example3 extends Component {
  render() {
    return (
      <div className="experience-list">
        {data.Experiences.map((experience) => (
          <article className="experience-card" key={experience.companyName}>
            <a href={experience.url} target="_blank" rel="noreferrer">
              {experience.companyName}
            </a>
            {experience.roles.map((role) => (
              <div className="experience-role" key={`${experience.companyName}-${role.title}`}>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                <p className="experience-meta">
                  {role.startDate} – {role.endDate} · {role.location}
                </p>
              </div>
            ))}
          </article>
        ))}
      </div>
    )
  }
}

export default Example3
