import { useReducer, useRef, useState, type FormEvent } from 'react'
import { ContactProvider, useContacts } from './contacts/ContactsContext'
import './App.css'

interface Profile {
  name: string
  bio: string
}

type ProfileState =
  | { status: 'initial' | 'loading'; profile: Profile | null }
  | { status: 'success'; profile: Profile }
  | { status: 'error'; profile: Profile | null; error: string }

type ProfileAction =
  | { type: 'start' }
  | { type: 'success'; profile: Profile }
  | { type: 'error'; error: string }

const initialProfileState: ProfileState = { status: 'initial', profile: null }

function profileReducer(
  state: ProfileState,
  action: ProfileAction,
): ProfileState {
  switch (action.type) {
    case 'start':
      return { status: 'loading', profile: state.profile }
    case 'success':
      return { status: 'success', profile: action.profile }
    case 'error':
      return { status: 'error', profile: state.profile, error: action.error }
  }
}

function ProfileDemo() {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState)
  const [name, setName] = useState('Alex Morgan')
  const [bio, setBio] = useState('Learning React and TypeScript.')

  function updateProfile(shouldFail = false) {
    dispatch({ type: 'start' })

    window.setTimeout(() => {
      if (shouldFail) {
        dispatch({ type: 'error', error: 'The profile could not be saved. Try again.' })
        return
      }

      dispatch({ type: 'success', profile: { name: name.trim(), bio: bio.trim() } })
    }, 550)
  }

  return (
    <div className="demo-content">
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="field">
          <span>Bio</span>
          <input value={bio} onChange={(event) => setBio(event.target.value)} />
        </label>
      </div>
      <div className="button-row">
        <button
          className="button button-primary"
          disabled={state.status === 'loading' || !name.trim() || !bio.trim()}
          onClick={() => updateProfile()}
        >
          Save profile
        </button>
        <button
          className="button button-secondary"
          disabled={state.status === 'loading'}
          onClick={() => updateProfile(true)}
        >
          Simulate error
        </button>
      </div>
      <p className={`status status-${state.status}`} aria-live="polite">
        {state.status === 'initial' && 'Ready to update your profile.'}
        {state.status === 'loading' && 'Saving profile…'}
        {state.status === 'success' &&
          `Saved: ${state.profile.name} — ${state.profile.bio}`}
        {state.status === 'error' && state.error}
      </p>
    </div>
  )
}

interface SurveyState {
  status: 'initial' | 'submitting' | 'completed'
  started: boolean
  feedback: string
}

type SurveyAction =
  | { type: 'start' }
  | { type: 'submit'; feedback: string }
  | { type: 'complete' }
  | { type: 'reset' }

const initialSurveyState: SurveyState = {
  status: 'initial',
  started: false,
  feedback: '',
}

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'start':
      return { ...state, started: true }
    case 'submit':
      return { ...state, status: 'submitting', feedback: action.feedback }
    case 'complete':
      return { ...state, status: 'completed' }
    case 'reset':
      return initialSurveyState
  }
}

function SurveyDemo() {
  const [state, dispatch] = useReducer(surveyReducer, initialSurveyState)

  function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const feedback = String(formData.get('feedback') ?? '').trim()

    if (!feedback) {
      return
    }

    dispatch({ type: 'submit', feedback })
    window.setTimeout(() => dispatch({ type: 'complete' }), 550)
  }

  if (!state.started) {
    return (
      <div className="demo-content">
        <p className="muted">Share a quick thought about today’s experience.</p>
        <button className="button button-primary" onClick={() => dispatch({ type: 'start' })}>
          Start survey
        </button>
      </div>
    )
  }

  if (state.status === 'completed') {
    return (
      <div className="demo-content">
        <p className="status status-success" aria-live="polite">
          Thanks for your feedback: “{state.feedback}”
        </p>
        <button className="button button-secondary" onClick={() => dispatch({ type: 'reset' })}>
          Start over
        </button>
      </div>
    )
  }

  return (
    <form className="demo-content" onSubmit={submitFeedback}>
      <label className="field">
        <span>Your feedback</span>
        <textarea
          name="feedback"
          required
          rows={3}
          placeholder="What went well?"
          disabled={state.status === 'submitting'}
        />
      </label>
      <div className="button-row">
        <button className="button button-primary" disabled={state.status === 'submitting'}>
          {state.status === 'submitting' ? 'Submitting…' : 'Submit feedback'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={state.status === 'submitting'}
          onClick={() => dispatch({ type: 'reset' })}
        >
          Reset
        </button>
      </div>
    </form>
  )
}

interface ContactFormState {
  name: string
  email: string
  message: string
  status: 'ready' | 'editing' | 'submitted'
}

type ContactFormAction =
  | { type: 'updateField'; field: 'name' | 'email' | 'message'; value: string }
  | { type: 'submit' }
  | { type: 'resetForm' }

const initialContactFormState: ContactFormState = {
  name: '',
  email: '',
  message: '',
  status: 'ready',
}

function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction,
): ContactFormState {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value, status: 'editing' }
    case 'submit':
      return { ...state, status: 'submitted' }
    case 'resetForm':
      return initialContactFormState
  }
}

function ContactFormDemo() {
  const [state, dispatch] = useReducer(contactFormReducer, initialContactFormState)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch({ type: 'submit' })
  }

  return (
    <form className="demo-content" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input
            required
            value={state.name}
            onChange={(event) =>
              dispatch({ type: 'updateField', field: 'name', value: event.target.value })
            }
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            required
            type="email"
            value={state.email}
            onChange={(event) =>
              dispatch({ type: 'updateField', field: 'email', value: event.target.value })
            }
          />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea
          required
          rows={3}
          value={state.message}
          onChange={(event) =>
            dispatch({ type: 'updateField', field: 'message', value: event.target.value })
          }
        />
      </label>
      <div className="button-row">
        <button className="button button-primary">Send message</button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => dispatch({ type: 'resetForm' })}
        >
          Reset form
        </button>
      </div>
      <p className="status" aria-live="polite">
        Form state: <strong>{state.status}</strong>
        {state.status === 'submitted' && ` — Thanks, ${state.name}!`}
      </p>
    </form>
  )
}

function ContactsDemo() {
  const { state, dispatch } = useContacts()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function addContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail) {
      return
    }

    dispatch({
      type: 'addContact',
      contact: { id: crypto.randomUUID(), name: trimmedName, email: trimmedEmail },
    })
    setName('')
    setEmail('')
  }

  return (
    <div className="demo-content">
      <form className="field-grid" onSubmit={addContact}>
        <label className="field">
          <span>Name</span>
          <input required value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button className="button button-primary field-submit">Add contact</button>
      </form>
      {state.contacts.length > 0 ? (
        <ul className="contact-list">
          {state.contacts.map((contact) => (
            <li key={contact.id}>
              <span>
                <strong>{contact.name}</strong>
                <small>{contact.email}</small>
              </span>
              <button
                className="remove-button"
                aria-label={`Remove ${contact.name}`}
                onClick={() => dispatch({ type: 'removeContact', id: contact.id })}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">No contacts yet. Add one to see context state update.</p>
      )}
    </div>
  )
}

function FocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null)

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <div className="focus-demo">
      <label className="field">
        <span>Try typing here</span>
        <input ref={inputRef} placeholder="This field is focused on load" />
      </label>
      <button className="button button-primary" onClick={focusInput}>
        Focus input
      </button>
    </div>
  )
}

const exercises = [
  {
    number: '01',
    title: 'Profile status',
    description: 'A discriminated state and action union power profile updates.',
    component: <ProfileDemo />,
  },
  {
    number: '02',
    title: 'Survey feedback',
    description: 'Move through the initial, submitting, and completed states.',
    component: <SurveyDemo />,
  },
  {
    number: '03',
    title: 'Contact form',
    description: 'Update individual fields or reset the entire reducer state.',
    component: <ContactFormDemo />,
  },
  {
    number: '04',
    title: 'Shared contacts',
    description: 'A context provider shares reducer state without prop drilling.',
    component: <ContactsDemo />,
  },
  {
    number: '05',
    title: 'Input focus',
    description: 'A nullable HTMLInputElement ref safely focuses the DOM node.',
    component: <FocusDemo />,
  },
]

function App() {
  return (
    <ContactProvider>
      <main className="app-shell">
        <header className="page-header">
          <p className="eyebrow">Week 10 · Day 1 · Exercise XP Ninja</p>
          <h1>React State <span>Lab</span></h1>
          <p>Five hands-on patterns for confident, type-safe React apps.</p>
        </header>

        <div className="exercise-list">
          {exercises.map(({ number, title, description, component }) => (
            <section className="exercise-card" key={number} aria-labelledby={`exercise-${number}`}>
              <div className="exercise-heading">
                <span className="exercise-number">{number}</span>
                <div>
                  <h2 id={`exercise-${number}`}>{title}</h2>
                  <p>{description}</p>
                </div>
              </div>
              {component}
            </section>
          ))}
        </div>
        <footer>Built with React + TypeScript · Reducers · Context · Refs</footer>
      </main>
    </ContactProvider>
  )
}

export default App
