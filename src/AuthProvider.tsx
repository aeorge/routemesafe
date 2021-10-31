import React, { useState, useEffect, useContext, createContext } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth'
import { firebaseApp } from '../firebase.config'

type AuthContext = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => void
  signUp: (email: string, password: string) => void
  signOut: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

const authContextDefaultValue: AuthContext = {
  user: null,
  loading: false,
  signIn: () => ({}),
  signUp: () => ({}),
  signOut: () => ({})
}

const AuthContext = createContext<AuthContext>(authContextDefaultValue)

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const auth = getAuth(firebaseApp)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.code)
      console.log(error.message)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.code)
      console.log(error.message)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await auth.signOut()
    } catch (error) {
      console.log(error.code)
      console.log(error.message)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const authContextValue: AuthContext = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContext => useContext(AuthContext)
