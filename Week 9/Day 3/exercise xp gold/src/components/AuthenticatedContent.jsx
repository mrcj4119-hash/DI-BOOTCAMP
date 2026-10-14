import { useSelector } from 'react-redux'
import Logout from './Logout.jsx'

function AuthenticatedContent() {
  const user = useSelector((state) => state.auth.user)
  const firstName = user?.name.split(' ')[0] || 'there'

  return (
    <main className="welcome-card">
      <div className="welcome-topline">
        <span className="eyebrow">YOUR SPACE IS READY</span>
        <Logout />
      </div>
      <div className="welcome-icon" aria-hidden="true">
        ✳
      </div>
      <p className="eyebrow">SIGNED IN AS {user?.email}</p>
      <h1>
        Good to see
        <br />
        you, <span>{firstName}.</span>
      </h1>
      <p className="welcome-copy">
        You’re signed in and all set. This is your little corner of the app.
      </p>
      <div className="welcome-status">
        <span className="status-dot" />
        Signed in for this session
      </div>
    </main>
  )
}

export default AuthenticatedContent
