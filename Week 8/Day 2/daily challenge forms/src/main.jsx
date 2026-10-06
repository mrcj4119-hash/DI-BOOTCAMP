import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AutoCompletedText from './AutoCompletedText.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutoCompletedText />
  </StrictMode>,
)
