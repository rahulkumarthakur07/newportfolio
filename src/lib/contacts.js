import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export async function submitContact({ name, email, subject, message }) {
  const cleanSubject = (subject || '').trim()
  const cleanMessage = (message || '').trim()

  return addDoc(collection(db, 'contacts'), {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: cleanSubject,
    // keep project for older analytics rows / display fallback
    project: cleanSubject,
    message: cleanMessage,
    description: cleanMessage,
    createdAt: serverTimestamp(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timezone:
      typeof Intl !== 'undefined'
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}
