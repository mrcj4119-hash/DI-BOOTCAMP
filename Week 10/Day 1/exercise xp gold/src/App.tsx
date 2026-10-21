import { useState } from 'react'
import DataTable, { type TableColumn } from './components/DataTable'
import RegistrationForm from './components/RegistrationForm'
import UserList from './components/UserList'
import './App.css'

interface Contact {
  id: number
  name: string
  email: string
  company: string
}

const contacts: Contact[] = [
  { id: 1, name: 'Avery Johnson', email: 'avery@example.com', company: 'Northstar' },
  { id: 2, name: 'Jordan Lee', email: 'jordan@example.com', company: 'Brightside' },
  { id: 3, name: 'Morgan Patel', email: 'morgan@example.com', company: 'Northstar' },
]

const contactColumns: TableColumn<Contact>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'company', title: 'Company', sortable: true },
]

function App() {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([])

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Week 10 · Day 1 · Gold</p>
        <h1>React + TypeScript</h1>
        <p>Reusable hooks, generic components, and typed API data.</p>
      </header>

      <section className="exercise-panel">
        <p className="section-intro">
          Validate registration details and handle successful or failed submissions.
        </p>
        <RegistrationForm />
      </section>

      <section className="exercise-panel">
        <p className="section-intro">
          Sort by clicking a column header and select individual or all contacts.
        </p>
        <DataTable
          data={contacts}
          columns={contactColumns}
          onSelect={setSelectedContacts}
        />
        <p className="selection-summary" aria-live="polite">
          Selected contacts: {selectedContacts.length}
        </p>
      </section>

      <section className="exercise-panel">
        <p className="section-intro">
          Results are cached for five minutes; refresh bypasses the cache.
        </p>
        <UserList />
      </section>
    </main>
  )
}

export default App
