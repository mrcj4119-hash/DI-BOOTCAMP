import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'

export interface Contact {
  id: string
  name: string
  email: string
}

interface ContactState {
  contacts: Contact[]
}

type ContactAction =
  | { type: 'addContact'; contact: Contact }
  | { type: 'removeContact'; id: string }

interface ContactContextValue {
  state: ContactState
  dispatch: Dispatch<ContactAction>
}

const initialState: ContactState = { contacts: [] }

function contactReducer(
  state: ContactState,
  action: ContactAction,
): ContactState {
  switch (action.type) {
    case 'addContact':
      return { contacts: [...state.contacts, action.contact] }
    case 'removeContact':
      return {
        contacts: state.contacts.filter((contact) => contact.id !== action.id),
      }
  }
}

const ContactContext = createContext<ContactContextValue | undefined>(undefined)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(contactReducer, initialState)

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContacts() {
  const context = useContext(ContactContext)

  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider.')
  }

  return context
}
