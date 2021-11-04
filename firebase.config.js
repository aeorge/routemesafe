import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import env from './src/env'

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_DATABASE_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseStorage = getStorage(firebaseApp)
