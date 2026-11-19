import { createContext, useContext, useMemo, useState } from 'react'
import WorkForm from '../components/WorkForm'

const ContactModalContext = createContext(null)

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false)

  const value = useMemo(
    () => ({
      open,
      openContact: () => setOpen(true),
      closeContact: () => setOpen(false),
    }),
    [open],
  )

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <WorkForm open={open} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider')
  }
  return context
}
