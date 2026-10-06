import { Component } from 'react'
import data from './data/data.json'

class Example1 extends Component {
  render() {
    return (
      <ul className="social-links">
        {data.SocialMedias.map((url) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul>
    )
  }
}

export default Example1
