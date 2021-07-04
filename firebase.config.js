import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDBjnOrdFNNkGWvXOT-Vq07oQ-PAl71LDs',
  authDomain: 'routemesafe.firebaseapp.com',
  databaseURL: 'https://routemesafe.firebaseio.com',
  projectId: 'routemesafe',
  storageBucket: 'routemesafe.appspot.com',
  messagingSenderId: '305380710767',
  appId: '1:305380710767:web:160c1cd44bcfb3594eb09a'
}

export const firebaseApp = initializeApp(firebaseConfig)
