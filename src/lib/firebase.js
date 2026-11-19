import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBTu4aceyfL0IJo4s-1BIrN27EGWQDjDEs',
  authDomain: 'portfolio-66341.firebaseapp.com',
  projectId: 'portfolio-66341',
  storageBucket: 'portfolio-66341.firebasestorage.app',
  messagingSenderId: '135473685528',
  appId: '1:135473685528:web:a95e718f0796e3214d8f6d',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

/** Google accounts allowed to open /analytics */
export const analyticsEmails = ['rahulbarahi.connect@gmail.com']

export function canAccessAnalytics(user) {
  if (!user?.email) return false
  return analyticsEmails.some(
    (email) => email.toLowerCase() === user.email.toLowerCase(),
  )
}
